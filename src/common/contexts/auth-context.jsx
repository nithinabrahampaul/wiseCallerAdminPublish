import React, { createContext, useContext, useState } from "react";
import decode from "jwt-decode";
import { LoaderContext } from "./";
import {
  ORGANIZATON_LOGIN_API,
  ORGANIZATON_REGISTER_API,
  ORGANIZATON_VERIFY_API,
} from "../apis/api-urls";
import { executePostApi, setUserCookies } from "../apis/base-api";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoginForm, setLoginForm] = useState(true);
  const [subscriptionLogin, setSubscriptionLogin] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
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
      let result = await executePostApi(ORGANIZATON_REGISTER_API, values);
      if (result?.data?.success) {
      } else {
        toast.error(result.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onHandleVerifyOTP = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_VERIFY_API, values);
      if (result?.data?.success) {
        let decoded = decode(result.data.data.token);
        await setUserCookies({
          ...result.data.data,
          email: decoded.email,
          role: decoded.role,
        });
      } else {
        toast.error(result?.data?.message);
      }
      setLoginForm(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onHandleOrganizationSubscription = async (values) => {
    try {
      setRedirectLogin(false);
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_REGISTER_API, values);
      if (result?.data?.success) {
        let loginResult = await executePostApi(ORGANIZATON_LOGIN_API, {
          email: values.email,
        });
        if (loginResult?.data?.success) {
          setSubscriptionLogin(true);
        } else {
          toast.error(loginResult?.data?.message);
        }
      } else {
        if (result?.data?.message === "Email already exists.") {
          setRedirectLogin(true);
        }
        toast.error(result?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const value = {
    isLoginForm,
    subscriptionLogin,
    redirectLogin,
    onHandleLogin,
    onHandleRegister,
    onHandleVerifyOTP,
    onHandleOrganizationSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
