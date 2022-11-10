import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminSubscriptionColumns } from "../../../common/contants/data-columns";
import { useLoader, useSubscription } from "../../../common/hooks";
import { SubscriptionForm } from "./subscription-form";
import swal from "sweetalert";
const AdminSubscriptions = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const { loading } = useLoader();
  const {
    subscriptions,
    getAllSubscriptions,
    onUpdateSubscription,
    isUpdated,
  } = useSubscription();
  const [isVisible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    getAllSubscriptions({ page, limit, ...filters });
  }, [getAllSubscriptions, page, limit, filters, isUpdated]);

  const onDeleteSubscription = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the subscription!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onUpdateSubscription({ ...row, isDeleted: true });
        }
      });
    },
    [onUpdateSubscription]
  );

  const onSubmitForm = async (values) => {
    await onUpdateSubscription(values);
    setVisible(false);
    setInitialValues({});
  };

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeleteSubscription(row);
      } else {
        if (row) {
          setInitialValues(row);
        }
        setVisible(true);
      }
    },
    [onDeleteSubscription]
  );
  const columns = useMemo(
    () => adminSubscriptionColumns(onHandleOperations),
    [onHandleOperations]
  );

  useEffect(() => {
    if (!isVisible) {
      setInitialValues({});
    }
  }, [isVisible]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={subscriptions?.docs ? subscriptions.docs : []}
        totalDocs={subscriptions.totalDocs}
        pagingCounter={subscriptions.pagingCounter}
        hasPreviousPage={subscriptions.hasPrevPage}
        hasNextPage={subscriptions.hasNextPage}
        totalPages={subscriptions.totalPages}
        page={subscriptions.page}
        onPageChange={setPage}
        title={"Subscriptions"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilters}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
      />
      {isVisible && (
        <SubscriptionForm
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          onSubmitForm={onSubmitForm}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminSubscriptions;
