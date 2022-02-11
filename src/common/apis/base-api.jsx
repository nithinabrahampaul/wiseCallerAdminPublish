import { Cookies } from "react-cookie";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API;
let cookies = new Cookies();

export const executeGetApi = (url, params) => {
  return axios.get(url, getRequestConfiguration());
};

export const executePostApi = (url, data) => {
  return axios.post(url, data, getRequestConfiguration());
};

export const executePutApi = (url, data) => {
  return axios.put(url, data, getRequestConfiguration());
};

export const executeDeleteApi = (url) => {
  return axios.delete(url, getRequestConfiguration());
};

const getRequestConfiguration = () => {
  const requestConfig = {};
  requestConfig.headers = getHeaders();
};

const getHeaders = () => {
  const headers = {};
  headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const getToken = () => {
  const token = cookies.get("token");
  return token;
};

export const setUserCookies = async (values) => {
  cookies.set("token", values.token);
};

export const removeUserCookies = async () => {
  cookies.set("token", "");
};
