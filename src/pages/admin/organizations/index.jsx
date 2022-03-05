import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { useLoader, useOrganization } from "../../../common/hooks";

const AdminOrganization = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading } = useLoader();
  const { getAllOrganizations, organization } = useOrganization();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Contant Name",
        accessor: (row) => row?.contact_information?.name || "__",
      },
      {
        Header: "Phone",
        accessor: (row) => row?.contact_information?.phone_no || "__",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Action",
        accessor: (row) => {
          return (
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                as={Button}
                split
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-danger">
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        },
      },
      //   {
      //     Header: "Coupons",
      //     accessor: (row) => "__",
      //   },
      //   {
      //     Header: "Free Slots",
      //     accessor: (row) => "__",
      //   },
      //   {
      //     Header: "Active Slots",
      //     accessor: (row) => "__",
      //   },
      //   {
      //     Header: "Total Slots",
      //     accessor: (row) => "__",
      //   },
    ],
    []
  );

  useEffect(() => {
    getAllOrganizations({ limit, page });
  }, [limit, page, getAllOrganizations]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={organization?.docs ? organization.docs : []}
        totalDocs={organization.totalDocs}
        pagingCounter={organization.pagingCounter}
        hasPreviousPage={organization.hasPrevPage}
        hasNextPage={organization.hasNextPage}
        totalPages={organization.totalPages}
        page={organization.page}
        onPageChange={setPage}
        title={"Organization"}
        limit={limit}
      />
    </React.Fragment>
  );
};

export default AdminOrganization;
