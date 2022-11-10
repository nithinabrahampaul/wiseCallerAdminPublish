import React, { useCallback, useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import swal from "sweetalert";
import { WCDataTable } from "../../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { organizationCouponColumns } from "../../../../common/contants";
import {
  useCoupon,
  useLoader,
  useSubscription,
} from "../../../../common/hooks";
import { CouponFilter } from "./filter";

const OrganizationCoupons = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [allSubscriptions, setAllSubscriptions] = useState([]);

  const { coupons, getAllCoupons, onDeactivateCoupon, onExportCouponCSV } =
    useCoupon();
  const { subscriptions, getAllSubscriptions } = useSubscription();
  const { loading } = useLoader();

  useEffect(() => {
    getAllCoupons({ page, limit, ...filters });
  }, [page, limit, getAllCoupons, filters]);

  useEffect(() => {
    getAllSubscriptions({ type: "ORGANIZATION" });
  }, [getAllSubscriptions]);

  useEffect(() => {
    if (subscriptions.length) {
      setAllSubscriptions(
        subscriptions.map((item) => {
          return {
            label: item.title,
            value: item._id,
          };
        })
      );
    }
  }, [subscriptions]);

  const onCouponDeactivate = useCallback(
    async (id) => {
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
          await onDeactivateCoupon(id);
          await getAllCoupons({ page, limit, ...filters });
        }
      });
    },
    [page, limit, filters, getAllCoupons, onDeactivateCoupon]
  );

  const columns = useMemo(
    () => organizationCouponColumns(onCouponDeactivate),
    [onCouponDeactivate]
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
        title={"Coupons"}
        limit={limit}
        filters={filters}
        onHandleFilter={setFilterVisible.bind(this, true)}
        onHandleSearch={setFilters}
        onExportCSV={onExportCouponCSV.bind(this, filters)}
      />
      {isFilterVisible && (
        <CouponFilter
          visible={isFilterVisible}
          onClose={setFilterVisible.bind(this, false)}
          onSaveFilters={setFilters}
          filters={filters}
          plans={allSubscriptions}
          coupons={[]}
        />
      )}
    </React.Fragment>
  );
};

export default OrganizationCoupons;
