import React, { useCallback, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminTemplateColumns } from "../../../common/contants/data-columns";
import { useLoader, useTemplate } from "../../../common/hooks";
import { TemplateForm } from "./template-form";

const AdminTemplates = () => {
  const [, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);
  const { loading } = useLoader();
  const { templates } = useTemplate();

  const onHandleOperations = useCallback((value, row) => {
    if (value === "delete") {
      // onDeletePage(row);
    } else if (value === "view") {
      // setViewable(true);
      // setViewPage(row);
    } else {
      if (row) {
        //   setInitialValues(row);
      }
      setVisible(true);
    }
  }, []);

  const columns = useMemo(
    () => adminTemplateColumns(onHandleOperations),
    [onHandleOperations]
  );
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
          onSubmitForm={(value) => console.log(value)}
          initialValues={{}}
        />
      )}
    </React.Fragment>
  );
};

export default AdminTemplates;
