import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import { WCDataTable } from "../../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { organizationEmployeeColumns } from "../../../../common/contants";
import {
  useCoupon,
  useEmployee,
  useLoader,
  useSubscription,
} from "../../../../common/hooks";
import { EmployeeFilter } from "./filter";

const OrganizationEmployees = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [allPlans, setAllPlans] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);

  const { employees, getAllEmployees } = useEmployee();
  const { subscriptions, getAllSubscriptions } = useSubscription();
  const { coupons, getAllCoupons } = useCoupon();
  const { loading } = useLoader();
  const [cookies] = useCookies();

  let columns = useMemo(() => organizationEmployeeColumns(), []);

  useEffect(() => {
    getAllEmployees({ page, limit, role: cookies.role });
  }, [getAllEmployees, page, limit, cookies]);

  useEffect(() => {
    let getFetchData = async () => {
      await getAllSubscriptions({ type: "ORGANIZATION" });
      await getAllCoupons({ role: cookies.role });
    };
    getFetchData();
  }, [getAllSubscriptions, cookies, getAllCoupons]);

  useEffect(() => {
    subscriptions?.length &&
      setAllPlans(
        subscriptions.map((item) => {
          return {
            value: item._id,
            label: item.title,
          };
        })
      );

    coupons?.length &&
      setAllCoupons(
        coupons.map((item) => {
          return {
            value: item._id,
            label: item.coupon_code,
          };
        })
      );
  }, [subscriptions, coupons]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={employees?.docs ? employees.docs : []}
        totalDocs={employees.totalDocs}
        hasPreviousPage={employees.hasPrevPage}
        hasNextPage={employees.hasNextPage}
        totalPages={employees.totalPages}
        page={employees.page}
        onPageChange={setPage}
        title={"Employees"}
        limit={limit}
        filters={filters}
        onHandleFilter={setFilterVisible.bind(this, true)}
        onHandleSearch={setFilters}
      />
      {isFilterVisible && (
        <EmployeeFilter
          visible={isFilterVisible}
          onClose={setFilterVisible.bind(this, false)}
          onSaveFilters={setFilters}
          filters={filters}
          plans={allPlans}
          coupons={allCoupons}
        />
      )}
    </React.Fragment>
  );
};

export default OrganizationEmployees;
