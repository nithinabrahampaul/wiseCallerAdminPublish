import { Cookies } from "react-cookie";
import axios from "axios";
import moment from "moment";
export const cookies = new Cookies();

// axios.defaults.baseURL = process.env.REACT_APP_API;

export const executeGetApi = async (url, params) => {
  return axios.get(url, await getRequestConfiguration());
};

export const executePostApi = async (url, data) => {
  return axios.post(url, data, await getRequestConfiguration());
};

export const executePutApi = async (url, data) => {
  return axios.put(url, data, await getRequestConfiguration());
};

export const executeDeleteApi = async (url) => {
  return axios.delete(url, await getRequestConfiguration());
};

export const executePostFormApi = async (url, data) => {
  return axios.post(url, data, await getFormRequestConfiguration());
};

const getRequestConfiguration = async () => {
  const requestConfig = {};
  requestConfig.headers = await getHeaders();
  return requestConfig;
};

const getFormRequestConfiguration = async () => {
  const requestConfig = {};
  requestConfig.headers = await getFormDataHeaders();
  return requestConfig;
};

const getFormDataHeaders = async () => {
  const headers = {};
  headers["Content-Type"] = "application/form-data";
  const token = await getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const getHeaders = async () => {
  const headers = {};
  headers["Content-Type"] = "application/json";
  const token = await getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const getToken = async () => {
  const token = cookies.get("token");
  return token;
};

export const setUserCookies = async (values) => {
  cookies.set("token", values.token, {
    expires: moment().endOf("day").toDate(),
  });
  cookies.set("email", values.email, {
    expires: moment().endOf("day").toDate(),
  });
  cookies.set("role", values.role, { expires: moment().endOf("day").toDate() });
};

export const removeUserCookies = async () => {
  cookies.remove("token", "");
  cookies.remove("email", "");
  cookies.remove("role", "");
};

export const setOrganizationCookies = async (values) => {
  // let cookies = new Cookies();
  cookies.set("email", values.email, {
    expires: moment().endOf("day").toDate(),
  });
  cookies.set("role", values.role, { expires: moment().endOf("day").toDate() });
};
