import React, { createContext, useContext, useState } from "react";
import decode from "jwt-decode";
import { LoaderContext } from "./";
import {
  ORGANIZATION_PROFILE_API,
  ORGANIZATON_LOGIN_API,
  ORGANIZATON_VERIFY_API,
} from "../apis/api-urls";
import {
  executeGetApi,
  executePostApi,
  setUserCookies,
} from "../apis/base-api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoginForm, setLoginForm] = useState(true);
  const [user, setUser] = useState(null);
  const { setLoading } = useContext(LoaderContext);

  const onHandleLogin = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_LOGIN_API, values);
      if (result?.data?.success) {
        setLoginForm(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onHandleRegister = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_LOGIN_API, values);
      if (result?.data?.success) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onHandleVerifyOTP = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_VERIFY_API, values);
      if (result?.data?.success) {
        await setUserCookies(result.data.data);
        await getOrganizationProfile();
        setLoading(false);
        setLoginForm(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getOrganizationProfile = async () => {
    try {
      setLoading(true);
      let { data } = await executeGetApi(ORGANIZATION_PROFILE_API);
      if (data?.success) {
        setUser(data.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const value = {
    isLoginForm,
    user,
    onHandleLogin,
    onHandleRegister,
    onHandleVerifyOTP,
    getOrganizationProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
