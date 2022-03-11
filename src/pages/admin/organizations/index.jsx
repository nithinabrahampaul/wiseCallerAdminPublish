import React, { useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminOrganizationColumns } from "../../../common/contants/data-columns";
import { useLoader, useOrganization } from "../../../common/hooks";

const AdminOrganization = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading } = useLoader();
  const { getAllOrganizations, allOrganizations } = useOrganization();

  const columns = useMemo(() => adminOrganizationColumns(), []);

  useEffect(() => {
    getAllOrganizations({ limit, page });
  }, [limit, page, getAllOrganizations]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={allOrganizations?.docs ? allOrganizations.docs : []}
        totalDocs={allOrganizations.totalDocs}
        pagingCounter={allOrganizations.pagingCounter}
        hasPreviousPage={allOrganizations.hasPrevPage}
        hasNextPage={allOrganizations.hasNextPage}
        totalPages={allOrganizations.totalPages}
        page={allOrganizations.page}
        onPageChange={setPage}
        title={"Organization"}
        limit={limit}
      />
    </React.Fragment>
  );
};

export default AdminOrganization;
