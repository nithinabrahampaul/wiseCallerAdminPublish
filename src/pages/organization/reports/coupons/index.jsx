import React, { useCallback, useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
// import { useCookies } from "react-cookie";
import swal from "sweetalert";
import { WCDataTable } from "../../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { organizationCouponColumns } from "../../../../common/contants";
import { useCoupon, useLoader } from "../../../../common/hooks";
import { CouponFilter } from "./filter";

const OrganizationCoupons = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({});

  const { coupons, getAllCoupons, onDeactivateCoupon, onExportCouponCSV } =
    useCoupon();
  const { loading } = useLoader();
  // const [cookies] = useCookies();

  useEffect(() => {
    getAllCoupons({ page, limit, ...filters });
  }, [page, limit, getAllCoupons, filters]);

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
          plans={[]}
          coupons={[]}
        />
      )}
    </React.Fragment>
  );
};

export default OrganizationCoupons;
