import React, { createContext, useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executePostApi } from "../apis";
import { GET_ALL_USERS } from "../apis/api-urls";

export const EmployeeContext = createContext({});

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  const getAllEmployees = useCallback(
    async (params) => {
      try {
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

  const value = {
    employees,
    getAllEmployees: useCallback(
      (params) => {
        getAllEmployees(params);
      },
      [getAllEmployees]
    ),
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
