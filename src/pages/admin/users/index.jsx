import React, { useEffect, useState, useMemo, useCallback } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import {
  useCoupon,
  useEmployee,
  useLoader,
  useNotificaton,
  useOrganization,
  useSubscription,
} from "../../../common/hooks";
import swal from "sweetalert";
import UserChangePlan from "./user-plan";
import { adminUsersColumns } from "../../../common/contants/data-columns";
import { useLocation } from "react-router-dom";
import { AdminUserFilter } from "./filter";
import { toast } from "react-toastify";
import { WCSendNotification } from "../../../common/components/wc-send-notification";

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [allPlans, setAllPlans] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isNotification, setNotification] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isPlanVisible, setPlanVisible] = useState(false);
  const { loading } = useLoader();
  const {
    employees,
    getAllEmployees,
    onExportEmployeeCSV,
    onDeactivateUser,
    isDeactivated,
    onPlanChange,
    onGenerateInvoice,
  } = useEmployee();
  const { coupons, getAllCoupons } = useCoupon();
  const { subscriptions, getAllSubscriptions } = useSubscription();
  const { allOrganizations, getAllOrganizations } = useOrganization();
  const { onSendCustomNotification } = useNotificaton();
  const location = useLocation();

  const onHandleDeactivateUser = useCallback(
    (value, id) => {
      let content = {
        element: "input",
        attributes: {
          placeholder: "Reason for Deactivate a user",
          type: "text",
        },
      };
      swal({
        title: "Are you sure?",
        text: !value
          ? "You want to activate account?"
          : "You want to deactivate account?",
        icon: "warning",
        input: "text",
        content: value && content,
        dangerMode: true,
        buttons: {
          confirm: "Yes",
          cancel: "No",
        },
      }).then(async (e, value) => {
        if (e === "" && !value) {
          toast.error("Reason is required");
        } else if (e) {
          let payload = {
            deactivate_reason: e,
            user_id: id,
          };
          await onDeactivateUser(payload);
        }
      });
    },
    [onDeactivateUser]
  );

  const onHandleSendNotification = useCallback((values) => {
    setSelectedEmployees([values]);
    setNotification(true);
  }, []);

  const onHandlePlanChange = useCallback((values) => {
    setSelectedEmployees([values]);
    setPlanVisible(true);
  }, []);

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

  const onChangePlan = async (values) => {
    await onPlanChange({ ...values, user_id: selectedEmployees[0]._id });
    setPlanVisible(false);
  };

  const columns = useMemo(
    () =>
      adminUsersColumns(
        onHandleDeactivateUser,
        onHandlePlanChange,
        onHandleSendNotification,
        onGenerateInvoice
      ),
    [
      onHandleDeactivateUser,
      onHandlePlanChange,
      onHandleSendNotification,
      onGenerateInvoice,
    ]
  );

  useEffect(() => {
    getAllEmployees({ page, limit, ...filters });
  }, [getAllEmployees, page, limit, filters, isDeactivated]);

  useEffect(() => {
    let getFetchData = async () => {
      await getAllSubscriptions();
      await getAllCoupons();
      await getAllOrganizations();
    };
    getFetchData();
  }, [getAllSubscriptions, getAllCoupons, getAllOrganizations]);

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

    allOrganizations?.length &&
      setOrganizations(
        allOrganizations.map((item) => {
          return {
            value: item._id,
            label: item.name,
          };
        })
      );
  }, [subscriptions, coupons, allOrganizations]);

  useEffect(() => {
    if (location.search) {
      let search = location.search.slice(1).split("=");
      setFilters({ [search[0]]: search[1] });
    }
  }, [location]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={employees?.docs ? employees.docs : []}
        totalDocs={employees.totalDocs}
        pagingCounter={employees.pagingCounter}
        hasPreviousPage={employees.hasPrevPage}
        hasNextPage={employees.hasNextPage}
        totalPages={employees.totalPages}
        page={employees.page}
        onPageChange={setPage}
        title={"Users"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilters}
        onHandleFilter={setFilterVisible.bind(this, true)}
        onExportCSV={onExportEmployeeCSV.bind(this, filters)}
        onHandleSendNotification={setNotification.bind(true)}
      />
      {isPlanVisible && (
        <UserChangePlan
          visible={isPlanVisible}
          onClose={setPlanVisible.bind(this, false)}
          plans={allPlans}
          onChangePlan={onChangePlan}
        />
      )}
      {isFilterVisible && (
        <AdminUserFilter
          visible={isFilterVisible}
          onClose={setFilterVisible.bind(this, false)}
          onSaveFilters={setFilters}
          filters={filters}
          plans={allPlans}
          coupons={allCoupons}
          organizations={organizations}
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

export default AdminUsers;
