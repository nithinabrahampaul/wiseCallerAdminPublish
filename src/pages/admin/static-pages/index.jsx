import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminPagesColumns } from "../../../common/contants/data-columns";
import { useLoader, usePages } from "../../../common/hooks";
import { StaticPage } from "./page-form";
import swal from "sweetalert";
import { ViewPage } from "./view-page";

const AdminStaticPages = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilter] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isViewable, setViewable] = useState(false);
  const [viewPage, setViewPage] = useState(null);

  const {
    onUpdateStaticPage,
    getAllStaticPages,
    pages,
    isPageCreated,
    isPageUpdated,
  } = usePages();
  const { loading } = useLoader();

  const onUpdatePage = useCallback(
    async (values) => {
      await onUpdateStaticPage(values);
      setInitialValues({});
      setVisible(false);
      await getAllStaticPages();
    },
    [onUpdateStaticPage, getAllStaticPages]
  );

  useEffect(() => {
    getAllStaticPages({ page, limit, ...filters });
  }, [getAllStaticPages, page, limit, filters]);

  useEffect(() => {
    if (isPageCreated || isPageUpdated) {
      getAllStaticPages({ page, limit, ...filters });
    }
  }, [isPageCreated, isPageUpdated, page, limit, getAllStaticPages, filters]);

  const onDeletePage = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the page!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onUpdatePage({ ...row, isDeleted: true });
        }
      });
    },
    [onUpdatePage]
  );

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeletePage(row);
      } else if (value === "view") {
        setViewable(true);
        setViewPage(row);
      } else {
        if (row) {
          setInitialValues(row);
        }
        setVisible(true);
      }
    },
    [onDeletePage]
  );

  const columns = useMemo(
    () => adminPagesColumns(onHandleOperations),
    [onHandleOperations]
  );

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={pages?.docs ? pages.docs : []}
        totalDocs={pages.totalDocs}
        pagingCounter={pages.pagingCounter}
        hasPreviousPage={pages.hasPreviousPage}
        hasNextPage={pages.hasNextPage}
        totalPages={pages.totalPages}
        page={pages.page}
        onPageChange={setPage}
        title={"Static Pages"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilter}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
      />
      {isVisible && (
        <StaticPage
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          onSubmitForm={onUpdatePage}
          initialValues={initialValues}
        />
      )}
      {isViewable && (
        <ViewPage
          visible={isViewable}
          onClose={setViewable.bind(this, false)}
          page={viewPage}
        />
      )}
    </React.Fragment>
  );
};

export default AdminStaticPages;
