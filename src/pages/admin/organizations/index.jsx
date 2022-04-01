import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { adminOrganizationColumns } from "../../../common/contants/data-columns";
import {
  useGlobalTypes,
  useLoader,
  useOrganization,
} from "../../../common/hooks";
import { OrganizationForm } from "./organization-form";
import swal from "sweetalert";
import { AdminOrganizationFilter } from "./filter";

const AdminOrganization = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const { loading } = useLoader();

  const {
    allOrganizations,
    getAllOrganizations,
    onUpdateOrganization,
    isUpdated,
    onDeleteOrganization,
    onExportOrganizationCSV,
  } = useOrganization();
  const { globalTypes, getGlobalTypes } = useGlobalTypes();

  useEffect(() => {
    getAllOrganizations({ page, limit });
  }, [getAllOrganizations, page, limit, isUpdated]);

  useEffect(() => {
    const fetchData = async () => {
      await getGlobalTypes();
    };
    fetchData();
  }, [getGlobalTypes]);

  useEffect(() => {
    getAllOrganizations({ limit, page, ...filters });
  }, [limit, page, getAllOrganizations, filters]);

  useEffect(() => {
    if (globalTypes) {
      setTypes(
        globalTypes.map((item) => {
          return {
            label: item.type,
            value: item.value,
          };
        })
      );
    }
  }, [globalTypes]);

  const onDeleteOrganizations = useCallback(
    (row) => {
      swal({
        title: "Are you sure?",
        text: "You want to delete the Organization!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: "Confirm",
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value) {
          onDeleteOrganization(row._id);
        }
      });
    },
    [onDeleteOrganization]
  );

  const onSubmitForm = async (values) => {
    await onUpdateOrganization(values);
    setVisible(false);
    setInitialValues({});
  };

  const onHandleOperations = useCallback(
    (value, row) => {
      if (value === "delete") {
        onDeleteOrganizations(row);
      } else {
        if (row) {
          setInitialValues(row);
        }
        setVisible(true);
      }
    },
    [onDeleteOrganizations]
  );

  const columns = useMemo(
    () => adminOrganizationColumns(onHandleOperations),
    [onHandleOperations]
  );

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
        title={"Organizations"}
        limit={limit}
        filters={filters}
        onHandleSearch={setFilters}
        onHandleCreate={onHandleOperations.bind(this, "create", "")}
        onHandleFilter={setFilterVisible.bind(this, true)}
        onExportCSV={onExportOrganizationCSV.bind(this, filters)}
      />
      {isVisible && (
        <OrganizationForm
          visible={isVisible}
          onClose={setVisible.bind(this, false)}
          onSubmitForm={onSubmitForm}
          initialValues={initialValues}
          types={types}
        />
      )}

      {isFilterVisible && (
        <AdminOrganizationFilter
          visible={isFilterVisible}
          onClose={setFilterVisible.bind(this, false)}
          filters={filters}
          onSaveFilters={setFilters}
        />
      )}
    </React.Fragment>
  );
};

export default AdminOrganization;
