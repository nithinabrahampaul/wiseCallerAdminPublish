import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { executePostApi } from "../apis";
import { CREATE_GLOBAL_TYPES, GET_ALL_GLOBAL_TYPES } from "../apis/api-urls";
import { LoaderContext } from "./loader-context";

export const GlobalTypesContext = createContext();

export const GlablTypesProvider = ({ children }) => {
  const [globalTypes, setGloabalTypes] = useState([]);
  const [isRefetched, setRefetched] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const getGlobalTypes = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_GLOBAL_TYPES, params);
        if (result?.data?.success) {
          setGloabalTypes(result.data.data);
          setRefetched(false);
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

  const onCreateGlobalTypes = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(CREATE_GLOBAL_TYPES, values);
        if (result?.data?.success) {
          toast.success("Global types added!");
          setRefetched(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    },
    [setLoading]
  );

  const onUpdateGlobalTypes = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(CREATE_GLOBAL_TYPES, values);
        if (result?.data?.success) {
          toast.success("Global types updated!");
          setRefetched(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    },
    [setLoading]
  );

  const onDeleteGlobalTypes = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(CREATE_GLOBAL_TYPES, values);
        if (result?.data?.success) {
          toast.success("Global types deleted!");
          setRefetched(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    },
    [setLoading]
  );

  let values = {
    globalTypes,
    isRefetched,
    getGlobalTypes: useCallback(
      (params) => {
        getGlobalTypes(params);
      },
      [getGlobalTypes]
    ),
    onCreateGlobalTypes: useCallback(
      (values) => {
        onCreateGlobalTypes(values);
      },
      [onCreateGlobalTypes]
    ),
    onUpdateGlobalTypes: useCallback(
      (values) => {
        onUpdateGlobalTypes(values);
      },
      [onUpdateGlobalTypes]
    ),
    onDeleteGlobalTypes: useCallback(
      (values) => {
        onDeleteGlobalTypes(values);
      },
      [onDeleteGlobalTypes]
    ),
  };
  return (
    <GlobalTypesContext.Provider value={values}>
      {children}
    </GlobalTypesContext.Provider>
  );
};
