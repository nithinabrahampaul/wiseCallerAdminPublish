import React, { createContext, useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executePostApi, executePutApi } from "../apis";
import {
  EXPORT_USER_CSV,
  GET_ALL_USERS,
  DEACTIVATE_USER,
  CHANGE_USER_PLAN,
  GENERATE_USER_INVOICE,
} from "../apis/api-urls";
import { useDownload } from "../hooks";

export const EmployeeContext = createContext({});

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [isDeactivated, setDeactivated] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const [downloadCSV] = useDownload();

  const getAllEmployees = useCallback(
    async (params) => {
      try {
        setDeactivated(false);
        setLoading(true);
        let result = await executePostApi(GET_ALL_USERS, params);
        if (result?.data?.success) {
          setEmployees(result.data.data);
        } else {
          toast.error(result.data.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onExportEmployeeCSV = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(EXPORT_USER_CSV, params);
        if (result.data?.success) {
          downloadCSV(result.data.data, "employee", "csv");
          toast.success("CSV exported successfully");
        } else {
          toast.error(result.data?.message);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [setLoading, downloadCSV]
  );

  const onDeactivateUser = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePutApi(`${DEACTIVATE_USER}`, values);
        if (result?.data?.success) {
          setDeactivated(true);
          toast.success("User deactivated successfully!");
        } else {
          toast.error(result?.data?.message);
        }
        setLoading(false);
      } catch (error) {}
    },
    [setLoading]
  );

  const onPlanChange = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePutApi(CHANGE_USER_PLAN, values);
        if (result?.data?.success) {
          toast.success("Plan changes successfully");
        } else {
          toast.error(result?.data?.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onGenerateInvoice = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(GENERATE_USER_INVOICE, values);
        if (result?.data?.success) {
          toast.success("Invoice generated");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const value = {
    employees,
    isDeactivated,
    getAllEmployees: useCallback(
      (params) => {
        getAllEmployees(params);
      },
      [getAllEmployees]
    ),
    onExportEmployeeCSV: useCallback(
      (params) => {
        onExportEmployeeCSV(params);
      },
      [onExportEmployeeCSV]
    ),
    onDeactivateUser: useCallback(
      (values) => {
        onDeactivateUser(values);
      },
      [onDeactivateUser]
    ),
    onPlanChange: useCallback(
      (values) => {
        onPlanChange(values);
      },
      [onPlanChange]
    ),
    onGenerateInvoice: useCallback(
      (values) => {
        onGenerateInvoice(values);
      },
      [onGenerateInvoice]
    ),
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
