import React, { useCallback, useState, useEffect, useMemo } from "react";
// import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { WCDataTable } from "../../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { WCSendNotification } from "../../../../common/components/wc-send-notification";
import { organizationEmployeeColumns } from "../../../../common/contants";
import {
  useCoupon,
  useEmployee,
  useLoader,
  useNotificaton,
  usePlans,
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
  const [isNotification, setNotification] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const { employees, getAllEmployees, onExportEmployeeCSV, onGenerateInvoice } =
    useEmployee();
  const { subscriptions, getAllSubscriptions } = useSubscription();
  const { coupons, getAllCoupons } = useCoupon();
  const { onRevokePlan } = usePlans();
  const { loading } = useLoader();
  const { onSendCustomNotification } = useNotificaton();
  // const [cookies] = useCookies();
  const location = useLocation();

  useEffect(() => {
    getAllEmployees({ page, limit, ...filters });
  }, [getAllEmployees, page, limit, filters]);

  useEffect(() => {
    let getFetchData = async () => {
      await getAllSubscriptions({ type: "ORGANIZATION" });
      await getAllCoupons();
    };
    getFetchData();
  }, [getAllSubscriptions, getAllCoupons]);

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

  const onLocationSearch = useCallback(() => {
    if (location.search) {
      let search = location.search.slice(1).split("=");
      setFilters({ [search[0]]: search[1] });
    }
  }, [location.search]);

  useEffect(() => {
    onLocationSearch();
  }, [onLocationSearch]);

  const onPlanRevoke = useCallback(
    async (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to revoke the plan!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then(async (value) => {
        if (value) {
          await onRevokePlan({
            employee: row._id,
            coupon: row.organization_subscription.coupon_code,
          });
          getAllEmployees({ page, limit });
        }
      });
    },
    [onRevokePlan, page, limit, getAllEmployees]
  );

  const onSubmitNotification = async (values) => {
    let temp = selectedEmployees.map((item) =>
      item?.original ? item.original._id : item._id
    );

    let payload = {
      ...values,
      selected_users: temp,
      send_all: false,
    };

    await onSendCustomNotification(payload);
  };

  const onHandleSendNotification = useCallback((values) => {
    setSelectedEmployees([values]);
    setNotification(true);
  }, []);

  let columns = useMemo(
    () =>
      organizationEmployeeColumns(
        onPlanRevoke,
        subscriptions,
        onHandleSendNotification,
        onGenerateInvoice
      ),
    [onPlanRevoke, subscriptions, onHandleSendNotification, onGenerateInvoice]
  );

  const onHandleSelectEmployees = (values) => {
    if (values.length) {
      setSelectedEmployees(values);
    }
  };

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
        onHandleSearch={setFilters}
        onHandleFilter={setFilterVisible.bind(this, true)}
        onHandleSelected={onHandleSelectEmployees}
        onHandleSendNotification={setNotification.bind(this, true)}
        onExportCSV={onExportEmployeeCSV.bind(this, filters)}
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
      {isNotification && (
        <WCSendNotification
          visible={isNotification}
          onClose={setNotification.bind(this, false)}
          onSubmitForm={onSubmitNotification}
        />
      )}
    </React.Fragment>
  );
};

export default OrganizationEmployees;
