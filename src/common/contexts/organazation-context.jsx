import React, { createContext, useContext, useState } from "react";
import { LoaderContext } from "./";
import {
  executeGetApi,
  setOrganizationCookies,
  executePostApi,
} from "../apis/base-api";
import {
  GET_ALL_ORGANIZATIONS,
  GET_ORGANIZATION_USERS,
  ORGANIZATION_PROFILE_API,
  UPDATE_ORGANIZATION_PROFILE,
} from "../apis/api-urls";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const OrganizationContext = createContext({});
export const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState(null);
  const [employees, setEmployees] = useState([]);
  const { setLoading } = useContext(LoaderContext);

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
      let result = await executePostApi(GET_ALL_ORGANIZATIONS, params);
      if (result?.data?.success) {
        setOrganization(result.data.data);
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
      let result = await executePostApi(UPDATE_ORGANIZATION_PROFILE, values);
      if (result?.data?.success) {
        setOrganization(result.data.data);
        toast.success("Profile updated successfully");
      } else {
        toast.error(result?.data.message);
      }
      setLoading(false);
    },
    [setLoading]
  );

  let value = {
    organization,
    employees,
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
  };
  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};
