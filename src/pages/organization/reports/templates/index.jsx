import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { organizationTemplateColumns } from "../../../../common/contants/data-columns";
import { useDownload, useLoader, useTemplate } from "../../../../common/hooks";

const OrganizationTemplates = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const { loading } = useLoader();
  const { templates, getAlTemplates } = useTemplate();
  const { downloadImage } = useDownload();

  const onHandleOperations = useCallback(
    async (value, row) => {
      downloadImage(row.template);
    },
    [downloadImage]
  );

  useEffect(() => {
    getAlTemplates({ page, limit, ...filters });
  }, [getAlTemplates, page, limit, filters]);

  const columns = useMemo(
    () => organizationTemplateColumns(onHandleOperations),
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
      />
    </React.Fragment>
  );
};

export default OrganizationTemplates;
