import React, { useState } from "react";
import {
  Card,
  Nav,
  Pagination,
  Table,
  Button,
  ButtonGroup,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useTable, useRowSelect, useExpanded } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowCircleRight,
  faPaperPlane,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-lodash-debounce";
import { useEffect } from "react";
import { WCSelection } from "./wc-selection";
import { WCAppliedFilter } from "./wc-applied-filter";

// const pageLimits = [10, 20, 50];
let expandableColumnOptions = {
  id: "expander",
  Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) =>
    isAllRowsExpanded ? (
      <FontAwesomeIcon
        icon={faArrowCircleDown}
        {...getToggleAllRowsExpandedProps()}
      />
    ) : (
      <FontAwesomeIcon
        icon={faArrowCircleRight}
        {...getToggleAllRowsExpandedProps()}
      />
    ),
  Cell: ({ row }) =>
    row.canExpand ? (
      row.isExpanded ? (
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          {...row.getToggleRowExpandedProps()}
        />
      ) : (
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          {...row.getToggleRowExpandedProps()}
        />
      )
    ) : null,
};

let selectableColumnOptions = {
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <WCSelection {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({ row }) => {
    return !row.depth ? (
      <WCSelection {...row.getToggleRowSelectedProps()} />
    ) : null;
  },
};

let columnsOptions = [];

export const WCDataTable = ({
  data,
  columns,
  totalDocs,
  hasPreviousPage,
  hasNextPage,
  totalPages,
  page,
  onPageChange,
  title,
  limit,
  onHandleFilter,
  filters = {},
  onHandleSearch,
  onHandleCreate,
  onHandleSelected = null,
  onHandleSendNotification,
  onExportCSV,
  expandable = false,
}) => {
  const [searchValue, setSearchValue] = useState(null);
  const search = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (expandable) {
      columnsOptions = [expandableColumnOptions, selectableColumnOptions];
    } else {
      columnsOptions = [selectableColumnOptions];
    }
  }, [expandable, selectableColumnOptions]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
  } = useTable(
    { data, columns, initialState: {} },
    useExpanded,
    useRowSelect,
    (hooks) =>
      hooks.visibleColumns.push((columns) => [...columnsOptions, ...columns])
  );

  useEffect(() => {
    if (search?.target?.value || search?.target?.value === "") {
      onHandleSearch({ ...filters, search: search.target.value });
    }
  }, [search, filters, onHandleSearch]);

  useEffect(() => {
    if (onHandleSelected && selectedFlatRows.length >= 0) {
      onHandleSelected(selectedFlatRows);
    }
  }, [onHandleSelected, selectedFlatRows]);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{title}</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            {onHandleFilter && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onHandleFilter}
              >
                Filter
              </Button>
            )}
            {onExportCSV && (
              <Button variant="outline-primary" size="sm" onClick={onExportCSV}>
                Export
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                defaultValue={filters?.search}
                onChange={setSearchValue.bind(this)}
              />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <React.Fragment>
              {onHandleSendNotification ? (
                <ButtonGroup>
                  <Button variant="link" onClick={onHandleSendNotification}>
                    <span className="icon icon-sm icon-gray">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                  </Button>
                </ButtonGroup>
              ) : (
                <></>
              )}
              {onHandleCreate && (
                <ButtonGroup>
                  <Button variant="link" onClick={onHandleCreate}>
                    <span className="icon icon-sm icon-gray">
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </span>
                  </Button>
                </ButtonGroup>
              )}
            </React.Fragment>
          </Col>
        </Row>
        <WCAppliedFilter filters={filters} onUpdateFilter={onHandleSearch} />
        <Card border="light" className="shadow-sm">
          <Table
            responsive
            className="align-items-center table-flush"
            style={{ overflowX: "unset" }}
            {...getTableProps()}
          >
            <thead className="thead-light">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={index} scope="col" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => (
                      <td key={index} className="border-0">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  disabled={!hasPreviousPage}
                  onClick={onPageChange.bind(this, page - 1)}
                >
                  Previous
                </Pagination.Prev>
                {Array.from({ length: totalPages }, (v, k) => k + 1).map(
                  (item, index) => (
                    <Pagination.Item
                      active={item === page ? true : false}
                      key={index}
                      onClick={onPageChange.bind(this, item)}
                    >
                      {item}
                    </Pagination.Item>
                  )
                )}
                <Pagination.Next
                  disabled={!hasNextPage}
                  onClick={onPageChange.bind(this, page + 1)}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing{" "}
              <b>{page * limit < totalDocs ? page * limit : totalDocs}</b> out
              of <b>{totalDocs || 0}</b> entries
            </small>
          </Card.Footer>
        </Card>
      </div>
    </React.Fragment>
  );
};
