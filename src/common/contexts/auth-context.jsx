import React, { createContext, useContext, useState } from "react";
import decode from "jwt-decode";
import { LoaderContext } from "./";
import {
  ORGANIZATON_LOGIN_API,
  ORGANIZATON_REGISTER_API,
  ORGANIZATON_RESEND_OTP_API,
  ORGANIZATON_VERIFY_API,
} from "../apis/api-urls";
import { executePostApi } from "../apis/base-api";
import { toast } from "react-toastify";
import { OrganizationContext } from "./organazation-context";
import { useCookies } from "react-cookie";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoginForm, setLoginForm] = useState(true);
  const [subscriptionLogin, setSubscriptionLogin] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { setOrganization } = useContext(OrganizationContext);
  const [, setCookie] = useCookies();

  const onHandleLogin = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_LOGIN_API, values);
      if (result?.data?.success) {
        setLoginForm(false);
      } else {
        toast.error(result.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onHandleRegister = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_REGISTER_API, values);
      if (result?.data?.success) {
        setRedirectLogin(true);
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
        setCookie("email", decoded.email);
        setCookie("token", result.data.data.token);
        setCookie("role", decoded.role);
        setOrganization(decoded);
        setLoginForm(true);
      } else {
        setLoginForm(false);
        toast.error(result?.data?.message);
      }
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
        setRedirectLogin(true);
        if (result?.data?.message === "Email already exists.") {
          let loginResult = await executePostApi(ORGANIZATON_LOGIN_API, {
            email: values.email,
          });
          if (loginResult?.data?.success) {
            setSubscriptionLogin(true);
          } else {
            toast.error(loginResult?.data?.message);
          }
        }
        toast.error(result?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onRenendOTP = async (values) => {
    try {
      setLoading(true);
      let result = await executePostApi(ORGANIZATON_RESEND_OTP_API, values);
      if (result?.data?.success) {
        // setLoginForm(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const value = {
    isLoginForm,
    subscriptionLogin,
    redirectLogin,
    setRedirectLogin,
    onHandleLogin,
    onHandleRegister,
    onHandleVerifyOTP,
    onHandleOrganizationSubscription,
    onRenendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
