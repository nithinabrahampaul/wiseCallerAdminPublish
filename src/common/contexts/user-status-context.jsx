import React, { useState, createContext, useCallback } from "react";
import { toast } from "react-toastify";
import { executePostApi } from "../apis";
import { GET_ALL_USER_STATUS, UPDATE_USER_STATUS } from "../apis/api-urls";
import { useLoader } from "../hooks";

export const UserStatusContext = createContext();

export const UserStatusProvider = ({ children }) => {
  const [userStatues, setUserStatus] = useState([]);
  const [isUpdated, setUpdated] = useState([]);
  const { setLoading } = useLoader();

  const getAllUserStatus = useCallback(
    async (params) => {
      try {
        setUpdated(false);
        setLoading(true);
        let result = await executePostApi(GET_ALL_USER_STATUS, params);
        if (result?.data?.success) {
          setUserStatus(result.data.data);
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

  const onUpdateUserStatus = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(UPDATE_USER_STATUS, values);
        if (result?.data?.success) {
          setUpdated(true);
          toast.success("User status updated successfully!");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  let value = {
    userStatues,
    isUpdated,
    getAllUserStatus: useCallback(
      (params) => {
        getAllUserStatus(params);
      },
      [getAllUserStatus]
    ),
    onUpdateUserStatus: useCallback(
      (values) => {
        onUpdateUserStatus(values);
      },
      [onUpdateUserStatus]
    ),
  };
  return (
    <UserStatusContext.Provider value={value}>
      {children}
    </UserStatusContext.Provider>
  );
};
