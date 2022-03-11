import React, { useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminSubscriptionColumns } from "../../../common/contants/data-columns";
import { useLoader, useSubscription } from "../../../common/hooks";

const AdminSubscriptions = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const { loading } = useLoader();
  const { subscriptions, getAllSubscriptions } = useSubscription();

  const columns = useMemo(() => adminSubscriptionColumns(), []);

  useEffect(() => {
    getAllSubscriptions({ page, limit, ...filters });
  }, [getAllSubscriptions, page, limit, filters]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <WCDataTable
      columns={columns}
      data={subscriptions?.docs ? subscriptions.docs : []}
      totalDocs={subscriptions.totalDocs}
      pagingCounter={subscriptions.pagingCounter}
      hasPreviousPage={subscriptions.hasPrevPage}
      hasNextPage={subscriptions.hasNextPage}
      totalPages={subscriptions.totalPages}
      page={subscriptions.page}
      onPageChange={setPage}
      title={"Subscriptions"}
      limit={limit}
      filters={filters}
      onHandleSearch={setFilters}
    />
  );
};

export default AdminSubscriptions;
