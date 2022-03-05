import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { useEmployee, useLoader } from "../../../common/hooks";

const AdminUsers = () => {
  const { loading } = useLoader();
  const { employees, getAllEmployees } = useEmployee();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: (row) => row.first_name || "__",
      },
      {
        Header: "Last Name",
        accessor: (row) => row.last_name || "__",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Redeem Coupon",
        accessor: (row) => row?.organization_subscription?.coupon_code || "__",
      },
      {
        Header: "Status",
        accessor: (row) => {
          return (
            <span
              className={`fw-normal text-${
                row.isActive ? "success" : "danger"
              }`}
            >
              {row.isActive ? "Active" : "Inactive"}
            </span>
          );
        },
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
    ],
    []
  );

  useEffect(() => {
    getAllEmployees({ page, limit });
  }, [getAllEmployees, page, limit]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={employees?.docs ? employees.docs : []}
        totalDocs={employees.totalDocs}
        pagingCounter={employees.pagingCounter}
        hasPreviousPage={employees.hasPrevPage}
        hasNextPage={employees.hasNextPage}
        totalPages={employees.totalPages}
        page={employees.page}
        onPageChange={setPage}
        title={"Employees"}
        limit={limit}
      />
    </React.Fragment>
  );
};

export default AdminUsers;
