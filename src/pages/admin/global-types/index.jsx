import React, { useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminGlobalTypesColumns } from "../../../common/contants/data-columns";
import { useGlobalTypes, useLoader } from "../../../common/hooks";

export const AdminGlobalTypes = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading } = useLoader();
  const { globalTypes, getGlobalTypes } = useGlobalTypes();

  useEffect(() => {
    getGlobalTypes({ page, limit });
  }, [getGlobalTypes, page, limit]);

  const columns = useMemo(() => adminGlobalTypesColumns(() => {}), []);

  return loading ? (
    <WCPreLoader />
  ) : (
    <WCDataTable
      columns={columns}
      data={globalTypes?.docs ? globalTypes.docs : []}
      totalDocs={globalTypes.totalDocs}
      pagingCounter={globalTypes.pagingCounter}
      hasPreviousPage={globalTypes.hasPrevPage}
      hasNextPage={globalTypes.hasNextPage}
      totalPages={globalTypes.totalPages}
      page={globalTypes.page}
      onPageChange={setPage}
      title={"Global Types"}
      limit={limit}
    />
  );
};
