import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { executePostApi } from "../apis";
import { GET_ALL_GLOBAL_TYPES } from "../apis/api-urls";
import { LoaderContext } from "./loader-context";

export const GlobalTypesContext = createContext();

export const GlablTypesProvider = ({ children }) => {
  const [globalTypes, setGloabalTypes] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  const getGlobalTypes = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_GLOBAL_TYPES, params);
        if (result?.data?.success) {
          setGloabalTypes(result.data.data);
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

  //   const onUpdateGlobalTypes = useCallback(() => {
  //     try {
  //       //   let result = await executePostApi();
  //       //   if (result?.data?.success) {
  //       //     setGloabalTypes(result.data.data);
  //       //   } else {
  //       //     toast.error(result.data.message);
  //       //   }
  //       //   setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   }, [setLoading]);
  let values = {
    globalTypes,
    getGlobalTypes: useCallback(
      (params) => {
        getGlobalTypes(params);
      },
      [getGlobalTypes]
    ),
  };
  return (
    <GlobalTypesContext.Provider value={values}>
      {children}
    </GlobalTypesContext.Provider>
  );
};
