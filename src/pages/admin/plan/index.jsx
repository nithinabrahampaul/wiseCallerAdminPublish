import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminPlanColumns } from "../../../common/contants/data-columns";
import { useLoader, usePlans, useSubscription } from "../../../common/hooks";
import { PlanForm } from "./plan-form";
import swal from "sweetalert";

const AdminPlans = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isVisible, setVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const { loading } = useLoader();
  const {
    allPlans,
    getPaginatedPlans,
    onCreatePlans,
    isRefetched,
    onUpdatePlans,
    onDeletePlans,
  } = usePlans();
  const { subscriptions, getOrganizationSubscriptions } = useSubscription();

  useEffect(() => {
    getPaginatedPlans({ page, limit, ...filters });
  }, [getPaginatedPlans, filters, limit, page]);

  useEffect(() => {
    if (isRefetched) getPaginatedPlans({ page, limit, ...filters });
  }, [getPaginatedPlans, filters, limit, page, isRefetched]);

  useEffect(() => {
    getOrganizationSubscriptions();
  }, [getOrganizationSubscriptions]);

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

  const onDeletePlan = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the plan!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onDeletePlans({ ...row, isDeleted: true });
        }
      });
    },
    [onDeletePlans]
  );

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeletePlan(row);
      } else {
        if (row) {
          setInitialValues({ ...row, subscription: row.subscription._id });
        }
        setVisible(true);
      }
    },
    [onDeletePlan]
  );

  const onSubmitForm = async (values) => {
    if (Object.keys(initialValues).length) {
      onUpdatePlans({ ...initialValues, ...values });
    } else {
      onCreatePlans(values);
    }
    // if (values.applicable_types) {
    //   values.applicable_types = values.applicable_types.map(
    //     (item) => item.value
    //   );
    // }
    // await onUpdateUserStatus(values);
    setVisible(false);
    setInitialValues({});
  };

  const columns = useMemo(
    () => adminPlanColumns(onHandleOperations),
    [onHandleOperations]
  );

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={allPlans?.docs ? allPlans.docs : []}
        totalDocs={allPlans.totalDocs}
        pagingCounter={allPlans.pagingCounter}
        hasPreviousPage={allPlans.hasPrevPage}
        hasNextPage={allPlans.hasNextPage}
        totalPages={allPlans.totalPages}
        page={allPlans.page}
        onPageChange={setPage}
        title={"Plans"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilters}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
      />
      {isVisible && (
        <PlanForm
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          onSubmitForm={onSubmitForm}
          initialValues={initialValues}
          subscriptions={allSubscriptions}
        />
      )}
    </React.Fragment>
  );
};

export default AdminPlans;
