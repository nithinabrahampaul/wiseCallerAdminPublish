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
import { WCCopyClipboard } from "../../../common/components/wc-copy-clipboard";

const AdminOrganization = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [clipboardVisible, setClipboardVisible] = useState(false);
  const { loading } = useLoader();

  const {
    allOrganizations,
    getAllOrganizations,
    onUpdateOrganization,
    isUpdated,
    onDeleteOrganization,
    onExportOrganizationCSV,
    onCreateOrganization,
    onRegenaratePayment,
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
    if (Object.keys(initialValues).length) {
      await onUpdateOrganization(values);
    } else {
      let organization = await onCreateOrganization(values);
      if (organization.success && organization?.paymentUrl) {
        setClipboardVisible(true);
        setPaymentUrl(organization?.paymentUrl);
      }
    }
    setVisible(false);
    setInitialValues({});
  };

  const onHandleOperations = useCallback(
    async (value, row) => {
      if (value === "delete") {
        onDeleteOrganizations(row);
      } else if (value === "regenerate") {
        let paymentUrl = await onRegenaratePayment(row);
        if (paymentUrl) {
          setPaymentUrl(paymentUrl);
          setClipboardVisible(true);
        }
      } else {
        if (row) {
          let payload = {
            ...row,
            address: row.address_details.address,
            city: row.address_details.city,
            state: row.address_details.state,
            country: row.address_details.country,
            contact_name: row.contact_information.name,
            contact_email: row.contact_information.email,
            contact_phone: row.contact_information.phone_no,
          };
          setInitialValues(payload);
        }
        setVisible(true);
      }
    },
    [onDeleteOrganizations, onRegenaratePayment]
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

      {clipboardVisible && (
        <WCCopyClipboard
          visible={clipboardVisible}
          onClose={setClipboardVisible.bind(this, false)}
          paymentUrl={paymentUrl}
        />
      )}
    </React.Fragment>
  );
};

export default AdminOrganization;
