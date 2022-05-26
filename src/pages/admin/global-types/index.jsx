import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminGlobalTypesColumns } from "../../../common/contants/data-columns";
import {
  useGlobalTypes,
  useLoader,
  useUserStatus,
} from "../../../common/hooks";
import { GlobalTypesForm } from "./global-types-form";

export const AdminGlobalTypes = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isVisible, setVisible] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const { loading } = useLoader();
  const {
    globalTypes,
    getGlobalTypes,
    onCreateGlobalTypes,
    isRefetched,
    onUpdateGlobalTypes,
    onDeleteGlobalTypes,
  } = useGlobalTypes();
  const { getAllUserStatus, userStatues } = useUserStatus();

  useEffect(() => {
    getGlobalTypes({ page, limit });
  }, [getGlobalTypes, page, limit]);

  useEffect(() => {
    getGlobalTypes({ page, limit });
  }, [isRefetched, getGlobalTypes, limit, page]);

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

  useEffect(() => {
    if (globalTypes?.docs?.length) {
      setTypes(
        globalTypes.docs.map((item) => {
          if (item.statuses.length) {
            item.statuses.map((status) => {
              return Object.assign(status, { type: status.status });
            });
          }
          return Object.assign(item, { subRows: item.statuses });
        })
      );
    }
  }, [globalTypes]);

  const onSubmitForm = async (values) => {
    let payload = {
      ...values,
      statuses: values?.statuses?.map((item) => item.value),
    };

    if (initialValues) {
      await onCreateGlobalTypes(payload);
    } else {
      await onUpdateGlobalTypes(payload);
    }
    setVisible(false);
  };

  const onDeleteTypes = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the global type!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onDeleteGlobalTypes({ ...row, isDeleted: true });
        }
      });
    },
    [onDeleteGlobalTypes]
  );

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeleteTypes(row);
      } else {
        if (row) {
          let payload = {
            ...row,
            type: row.type,
            statuses: row.statuses.map((item) => {
              return {
                label: item.status,
                value: item._id,
              };
            }),
          };
          setInitialValues(payload);
        }
        setVisible(true);
      }
    },
    [onDeleteTypes]
  );

  const columns = useMemo(
    () => adminGlobalTypesColumns(onHandleOperations),
    [onHandleOperations]
  );

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={types?.length ? types : []}
        totalDocs={globalTypes.totalDocs}
        pagingCounter={globalTypes.pagingCounter}
        hasPreviousPage={globalTypes.hasPrevPage}
        hasNextPage={globalTypes.hasNextPage}
        totalPages={globalTypes.totalPages}
        page={globalTypes.page}
        onPageChange={setPage}
        title={"Global Types"}
        limit={limit}
        onHandleCreate={setVisible.bind(this, true)}
        expandable={true}
      />

      <GlobalTypesForm
        visible={isVisible}
        onClose={setVisible.bind(this, false)}
        onSubmitForm={onSubmitForm}
        initialValues={initialValues}
        statuses={statuses}
      />
    </React.Fragment>
  );
};
