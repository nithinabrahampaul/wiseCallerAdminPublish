import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminCouponColumns } from "../../../common/contants/data-columns";
import {
  useLoader,
  useCoupon,
  useSubscription,
  useOrganization,
} from "../../../common/hooks";
import { CreateCoupons } from "../organizations/create-coupon";
import { CouponChangePlan } from "./coupon-plan";
import { AdminCouponFilters } from "./filter";

const AdminCoupon = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isPlanChangeVisible, setPlanChangeVisible] = useState(false);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [organizationSubscriptions, setOrganizationSubscriptions] = useState(
    []
  );
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const { loading } = useLoader();
  const {
    coupons,
    isRefetch,
    getAllCoupons,
    onExportCouponCSV,
    onDeactivateCoupon,
    onCreateCoupon,
  } = useCoupon();
  const { subscriptions, getAllSubscriptions } = useSubscription();
  const { getAllOrganizations, allOrganizations } = useOrganization();
  const { onCouponChange } = useCoupon();

  useEffect(() => {
    getAllSubscriptions({});
    getAllOrganizations();
  }, [getAllSubscriptions, getAllOrganizations]);

  useEffect(() => {
    getAllCoupons({ page, limit, ...filters });
  }, [getAllCoupons, page, limit, filters, isRefetch]);

  const onCouponDeactivate = useCallback(
    async (id, status) => {
      swal({
        title: "Are you sure?",
        text: "You want to deactivate the coupon!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then(async (value) => {
        if (value) {
          await onDeactivateCoupon(id, { is_active: !status });
        }
      });
    },
    [onDeactivateCoupon]
  );

  const onHandlePlanChange = useCallback((values) => {
    setSelectedCoupon(values);
    setPlanChangeVisible(true);
  }, []);

  const onCouponPlanChange = async (values) => {
    await onCouponChange({ ...values });
    // await onPlanChange({ ...values, user_id: selectedEmployees[0]._id });
    setPlanChangeVisible(false);
  };

  useEffect(() => {
    if (subscriptions.length) {
      setUserSubscriptions(
        subscriptions
          .filter((item) => item.type === "USER")
          .map((item) => {
            return {
              label: item.title,
              value: item._id,
            };
          })
      );

      setOrganizationSubscriptions(
        subscriptions
          .filter((item) => item.type === "ORGANIZATION")
          .map((item) => {
            return {
              label: item.title,
              value: item._id,
            };
          })
      );
    }

    if (allOrganizations.length) {
      setOrganizations(
        allOrganizations.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    }
  }, [subscriptions, allOrganizations]);

  const columns = useMemo(
    () => adminCouponColumns(onCouponDeactivate, onHandlePlanChange),
    [onCouponDeactivate, onHandlePlanChange]
  );

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={coupons?.docs ? coupons.docs : []}
        totalDocs={coupons.totalDocs}
        pagingCounter={coupons.pagingCounter}
        hasPreviousPage={coupons.hasPrevPage}
        hasNextPage={coupons.hasNextPage}
        totalPages={coupons.totalPages}
        page={coupons.page}
        onPageChange={setPage}
        title={"Coupon"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilters}
        onHandleFilter={setFilterVisible.bind(this, true)}
        onExportCSV={onExportCouponCSV.bind(this, filters)}
        onHandleCreate={setVisible.bind(this, true)}
      />

      {isFilterVisible && (
        <AdminCouponFilters
          visible={isFilterVisible}
          onClose={setFilterVisible.bind(this, false)}
          onSaveFilters={setFilters}
          filters={filters}
          organizations={organizations}
        />
      )}

      {isVisible && (
        <CreateCoupons
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          subscriptions={userSubscriptions}
          onSaveCoupon={onCreateCoupon}
        />
      )}

      {isPlanChangeVisible && (
        <CouponChangePlan
          visible={isPlanChangeVisible}
          onClose={setPlanChangeVisible.bind(this, false)}
          onChangePlan={onCouponPlanChange}
          plans={organizationSubscriptions}
          initialValues={selectedCoupon}
        />
      )}
    </React.Fragment>
  );
};

export default AdminCoupon;
