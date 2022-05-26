import React, { createContext, useContext, useState } from "react";
import { LoaderContext } from "./";
import {
  executeGetApi,
  setOrganizationCookies,
  executePostApi,
  executeDeleteApi,
} from "../apis/base-api";
import {
  DELETE_ORGANIZATION_BY_ADMIN,
  EXPORT_ORGANIZATION_CSV,
  GET_ALL_ORGANIZATIONS,
  GET_ORGANIZATION_USERS,
  ORGANIZATION_OVERVIEW,
  ORGANIZATION_PROFILE_API,
  UPDATE_ORGANIZATION_PROFILE,
} from "../apis/api-urls";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDownload } from "../hooks";
import { convertToBase64 } from "../utils/convert-base64";

export const OrganizationContext = createContext({});
export const OrganizationProvider = ({ children }) => {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [isUpdated, setUpdated] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [overview, setOverview] = useState(null);
  const { setLoading } = useContext(LoaderContext);
  const [downloadCSV] = useDownload();

  const getOrganizationDetails = useCallback(async () => {
    try {
      setLoading(true);
      let result = await executeGetApi(ORGANIZATION_PROFILE_API);
      if (result?.data?.success) {
        setOrganizationCookies(result.data.data);
        setOrganization(result.data.data);
      }
      setLoading(false);
      if (result) {
      }
    } catch (error) {}
  }, [setLoading]);

  const getOrganizationEmployees = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executeGetApi(
          `${GET_ORGANIZATION_USERS}?page=${params.page}&limit=${params.limit}`
        );
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

  const getAllOrganizations = useCallback(
    async (params) => {
      setLoading(true);
      setUpdated(false);
      let result = await executePostApi(GET_ALL_ORGANIZATIONS, params);
      if (result?.data?.success) {
        setAllOrganizations(result.data.data);
      } else {
        toast.error(result.data.message);
      }
      setLoading(false);
    },
    [setLoading]
  );

  const onUpdateOrganization = useCallback(
    async (values) => {
      setLoading(true);
      if (values.profile?.length) {
        values.profile = await convertToBase64(values.profile[0]);
      }
      let result = await executePostApi(UPDATE_ORGANIZATION_PROFILE, values);
      if (result?.data?.success) {
        setOrganization(result.data.data);
        setUpdated(true);
        toast.success("Organization updated successfully");
      } else {
        toast.error(result?.data.message);
      }
      setLoading(false);
    },
    [setLoading]
  );

  const getOrganizationOverview = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(ORGANIZATION_OVERVIEW, params);
        if (result?.data?.success) {
          setOverview(result.data.data);
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

  const onDeleteOrganization = useCallback(
    async (id) => {
      try {
        setLoading(true);
        let result = await executeDeleteApi(
          `${DELETE_ORGANIZATION_BY_ADMIN}/${id}`
        );
        if (result?.data?.success) {
          setUpdated(true);
          toast.success("Organization deleted successfully!");
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

  const onExportOrganizationCSV = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(EXPORT_ORGANIZATION_CSV, params);
        if (result.data?.success) {
          downloadCSV(result.data.data, "organization", "csv");
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

  let value = {
    organization,
    isUpdated,
    employees,
    overview,
    allOrganizations,
    setOrganization,
    getOrganizationDetails: useCallback(() => {
      getOrganizationDetails();
    }, [getOrganizationDetails]),
    getOrganizationEmployees: useCallback(
      (params) => {
        getOrganizationEmployees(params);
      },
      [getOrganizationEmployees]
    ),
    getAllOrganizations: useCallback(
      (params) => {
        getAllOrganizations(params);
      },
      [getAllOrganizations]
    ),
    onUpdateOrganization: useCallback(
      (values) => {
        onUpdateOrganization(values);
      },
      [onUpdateOrganization]
    ),
    getOrganizationOverview: useCallback(
      (params) => {
        getOrganizationOverview(params);
      },
      [getOrganizationOverview]
    ),
    onDeleteOrganization: useCallback(
      (id) => {
        onDeleteOrganization(id);
      },
      [onDeleteOrganization]
    ),
    onExportOrganizationCSV: useCallback(
      (params) => {
        onExportOrganizationCSV(params);
      },
      [onExportOrganizationCSV]
    ),
  };
  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};
