import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminStatusColumns } from "../../../common/contants/data-columns";
import {
  useGlobalTypes,
  useLoader,
  useUserStatus,
} from "../../../common/hooks";
import { StatusForm } from "./status-form";
import swal from "sweetalert";

const AdminStatus = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [initialValues, setInitialValues] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [filters, setFilters] = useState({});
  const { loading } = useLoader();
  const { userStatues, getAllUserStatus, onUpdateUserStatus, isUpdated } =
    useUserStatus();
  const { globalTypes, getGlobalTypes } = useGlobalTypes();

  useEffect(() => {
    getAllUserStatus({ page, limit, ...filters });
  }, [getAllUserStatus, page, limit, isUpdated, filters]);

  const onSubmitForm = async (values) => {
    if (values.applicable_types) {
      values.applicable_types = values.applicable_types.map(
        (item) => item.value
      );
    }
    await onUpdateUserStatus(values);
    setVisible(false);
    setInitialValues({});
  };

  const onDeleteStatus = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the note!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onUpdateUserStatus({ ...row, isDeleted: true });
        }
      });
    },
    [onUpdateUserStatus]
  );

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeleteStatus(row);
      } else {
        if (row) {
          row.applicable_types = types.filter((item) =>
            row.applicable_types.includes(item.value)
          );
          console.log(row);
          setInitialValues(row);
        }
        setVisible(true);
      }
    },
    [types, onDeleteStatus]
  );

  useEffect(() => {
    getGlobalTypes();
  }, [getGlobalTypes]);

  useEffect(() => {
    if (globalTypes) {
      if (globalTypes?.docs) {
        setTypes(
          globalTypes?.docs.map((item) => {
            return {
              label: item.type,
              value: item._id,
            };
          })
        );
      } else {
        setTypes(
          globalTypes.map((item) => {
            return {
              label: item.type,
              value: item._id,
            };
          })
        );
      }
    }
  }, [globalTypes]);

  const columns = useMemo(
    () => adminStatusColumns(onHandleOperations),
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
        data={userStatues?.docs ? userStatues.docs : []}
        totalDocs={userStatues.totalDocs}
        pagingCounter={userStatues.pagingCounter}
        hasPreviousPage={userStatues.hasPrevPage}
        hasNextPage={userStatues.hasNextPage}
        totalPages={userStatues.totalPages}
        page={userStatues.page}
        onPageChange={setPage}
        title={"Status"}
        limit={limit}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
        filters={filters}
        onHandleSearch={setFilters}
      />
      {isVisible && (
        <StatusForm
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          types={types}
          initialValues={initialValues}
          onSubmitForm={onSubmitForm}
        />
      )}
    </React.Fragment>
  );
};

export default AdminStatus;
