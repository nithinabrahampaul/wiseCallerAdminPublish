import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminTemplateColumns } from "../../../common/contants/data-columns";
import { useLoader, useTemplate } from "../../../common/hooks";
import { TemplateForm } from "./template-form";

const AdminTemplates = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const { loading } = useLoader();
  const {
    templates,
    onCreateTemplate,
    getAlTemplates,
    isRefetched,
    onDeleteTemplate,
    onUpdateTemplate,
  } = useTemplate();

  const onRemoveTemplate = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the template!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then(async (value) => {
        if (value) {
          await onDeleteTemplate(row);
        }
      });
    },
    [onDeleteTemplate]
  );

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onRemoveTemplate(row);
      } else if (value === "view") {
        // setViewable(true);
        // setViewPage(row);
      } else {
        if (row) {
          setInitialValues(row);
        }
        setVisible(true);
      }
    },
    [onRemoveTemplate]
  );

  useEffect(() => {
    getAlTemplates({ page, limit });
  }, [getAlTemplates, page, limit]);

  useEffect(() => {
    if (isRefetched) {
      getAlTemplates({ page, limit });
    }
  }, [isRefetched, getAlTemplates, limit, page]);

  const onSubmitTemplate = useCallback(
    async (values) => {
      if (values._id) {
        await onUpdateTemplate(values);
      } else {
        await onCreateTemplate(values);
      }
      setVisible(false);
    },
    [onCreateTemplate, onUpdateTemplate]
  );

  const columns = useMemo(
    () => adminTemplateColumns(onHandleOperations),
    [onHandleOperations]
  );

  useEffect(() => {
    if (!visible) {
      setInitialValues({});
    }
  }, [visible]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={templates?.docs ? templates.docs : []}
        totalDocs={templates.totalDocs}
        pagingCounter={templates.pagingCounter}
        hasPreviousPage={templates.hasPreviousPage}
        hasNextPage={templates.hasNextPage}
        totalPages={templates.totalPages}
        page={templates.page}
        onPageChange={setPage}
        title={"Templates"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilters}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
      />
      {visible && (
        <TemplateForm
          visible={visible}
          onClose={setVisible.bind(this, false)}
          onSubmitForm={onSubmitTemplate.bind(this)}
          initialValues={initialValues}
        />
      )}
    </React.Fragment>
  );
};

export default AdminTemplates;
