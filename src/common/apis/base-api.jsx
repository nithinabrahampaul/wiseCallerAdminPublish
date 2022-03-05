import { Cookies } from "react-cookie";
import axios from "axios";

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

const getRequestConfiguration = async () => {
  const requestConfig = {};
  requestConfig.headers = await getHeaders();
  return requestConfig;
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
  let cookies = new Cookies();
  const token = cookies.get("token");
  return token;
};

export const setUserCookies = async (values) => {
  let cookies = new Cookies();
  cookies.set("token", values.token);
  cookies.set("email", values.email);
  cookies.set("role", values.role);
};

export const removeUserCookies = async () => {
  let cookies = new Cookies();
  cookies.remove("token", "");
  cookies.remove("email", "");
  cookies.remove("role", "");
};

export const setOrganizationCookies = async (values) => {
  let cookies = new Cookies();
  cookies.set("email", values.email);
  cookies.set("role", values.role);
};
