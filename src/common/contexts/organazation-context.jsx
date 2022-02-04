import React, { createContext, useContext, useState } from "react";
import { LoaderContext } from "./";
import { executePostApi, executeGetApi } from "../apis/base-api";
import { ORGANIZATON_LIST_API } from "../apis/api-urls";

export const AuthContext = createContext({});
const OrganazationContext = () => {
  const [data, setData] = useState([]);
  const OrganizationList = async (values) => {
    try {
      setLoading(true);
      let result = await executeGetApi(ORGANIZATON_LIST_API);

      if (result?.data?.success) {
        setData(result.data.data);
        localStorage.setItem("token", result.data?.data?.token);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default OrganazationContext;
