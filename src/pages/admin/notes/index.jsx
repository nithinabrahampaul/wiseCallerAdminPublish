import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminNotesColumns } from "../../../common/contants/data-columns";
import { useGlobalTypes, useLoader, useNote } from "../../../common/hooks";
import { NotesForm } from "./notes-form";
import swal from "sweetalert";

const AdminNotes = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [initialValues, setInitialValues] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const { loading } = useLoader();
  const { notes, getAllNotes, onUpdateNotes, isUpdated } = useNote();
  const { globalTypes, getGlobalTypes } = useGlobalTypes();

  useEffect(() => {
    getAllNotes({ page, limit });
  }, [getAllNotes, page, limit, isUpdated]);
  useEffect(() => {
    getGlobalTypes();
  }, [getGlobalTypes]);

  useEffect(() => {
    if (globalTypes) {
      setTypes(
        globalTypes.map((item) => {
          return {
            label: item.type,
            value: item.value,
          };
        })
      );
    }
  }, [globalTypes]);

  const onDeleteNotes = useCallback(
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
          onUpdateNotes({ ...row, isDeleted: true });
        }
      });
    },
    [onUpdateNotes]
  );

  const onSubmitForm = async (values) => {
    await onUpdateNotes(values);
    setVisible(false);
    setInitialValues({});
  };

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeleteNotes(row);
      } else {
        if (row) {
          setInitialValues(row);
        }
        setVisible(true);
      }
    },
    [onDeleteNotes]
  );

  const columns = useMemo(
    () => adminNotesColumns(onHandleOperations),
    [onHandleOperations]
  );

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={notes?.docs ? notes.docs : []}
        totalDocs={notes.totalDocs}
        pagingCounter={notes.pagingCounter}
        hasPreviousPage={notes.hasPrevPage}
        hasNextPage={notes.hasNextPage}
        totalPages={notes.totalPages}
        page={notes.page}
        onPageChange={setPage}
        title={"Notes"}
        filters={{}}
        limit={limit}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
      />
      {isVisible && (
        <NotesForm
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          onSubmitForm={onSubmitForm}
          initialValues={initialValues}
          types={types}
        />
      )}
    </React.Fragment>
  );
};

export default AdminNotes;
