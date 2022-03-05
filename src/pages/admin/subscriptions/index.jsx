import React, { useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { useLoader, useSubscription } from "../../../common/hooks";

const AdminSubscriptions = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading } = useLoader();
  const { subscriptions, getAllSubscriptions } = useSubscription();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Price",
        accessor: "original_price",
      },
      {
        Header: "Type",
        accessor: "type",
      },
    ],
    []
  );

  useEffect(() => {
    getAllSubscriptions({ page, limit });
  }, [getAllSubscriptions, page, limit]);

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
    />
  );
};

export default AdminSubscriptions;
