import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminSubStatusColumns } from "../../../common/contants/data-columns";
import {
  useLoader,
  useUserStatus,
} from "../../../common/hooks";
import { SubStatusForm } from "./sub-status-form";
import swal from "sweetalert";

const AdminSubStatus = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [initialValues, setInitialValues] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [filters, setFilters] = useState({});
  const { loading } = useLoader();
  const [statuses, setStatuses] = useState([]);
  const { userStatues, getUserSubStatus,getAllUserStatus, onUpdateUserSubStatus, isUpdated} =
    useUserStatus();

  useEffect(() => {
    getUserSubStatus({ page, limit});
  }, [getUserSubStatus, page, limit, isUpdated]);

  useEffect(() => {
    getAllUserStatus();
  }, [getAllUserStatus]);

  useEffect(() => {
    if (userStatues?.length) {
      setStatuses(
        userStatues.map((item) => {
          return {
            label: item.status,
            value: item._id,
          };
        })
      );
    }
  }, [userStatues]);


  const onSubmitForm = async (values) => {
    if (values.parentId) {
      values.parentId = values.parentId.map(
        (item) => item.value
      );
    }
    await onUpdateUserSubStatus(values);
    setVisible(false);
    setInitialValues({});
  };

  const onDeleteStatus = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the sub-status!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onUpdateUserSubStatus({ ...row, isDeleted: true });
        }
      });
    },
    [onUpdateUserSubStatus]
  );

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeleteStatus(row);
      } else {
        if (row){
          let payload = {
            ...row,
            type: row.type,
            parentId: row.parentId?.map((item) => {
              return {
                label: item,
                value: item,
              };
            }),
          };
          setInitialValues(payload);
        }
        setVisible(true);
      }
    },
    [types, onDeleteStatus]
  );

  const columns = useMemo(
    () => adminSubStatusColumns(onHandleOperations),
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
        title={"SubStatus"}
        limit={limit}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
        filters={filters}
        onHandleSearch={setFilters}
      />
      {isVisible && (
        <SubStatusForm
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          types={types}
          initialValues={initialValues}
          onSubmitForm={onSubmitForm}
          statuses={statuses}
        />
      )}
    </React.Fragment>
  );
};

export default AdminSubStatus;
