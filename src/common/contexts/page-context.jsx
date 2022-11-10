import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { executeGetApi, executePostApi } from "../apis";
import {
  GET_ALL_ADMIN_STATIC_PAGES,
  GET_PAGE_BY_NAME,
  UPDATE_ADMIN_STATIC_PAGES,
} from "../apis/api-urls";
import { LoaderContext } from "./loader-context";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [isPageCreated, setPageCreated] = useState(false);
  const [isPageUpdated, setPageUpdated] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const getAllStaticPages = useCallback(
    async (params) => {
      try {
        setPageCreated(false);
        setPageUpdated(false);
        setLoading(true);
        let API_URL = params
          ? `${GET_ALL_ADMIN_STATIC_PAGES}`
          : GET_ALL_ADMIN_STATIC_PAGES;

        let result = await executePostApi(API_URL, params);
        if (result?.data?.success) {
          setPages(result.data.data);
        } else {
          toast.error(result?.data?.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onUpdateStaticPage = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(UPDATE_ADMIN_STATIC_PAGES, values);
        if (result?.data?.success) {
          toast.success("Page updated successfully!");
        } else {
          toast.error(result?.data?.message);
        }
        setPageCreated(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const getPageByName = useCallback(
    async (name) => {
      try {
        setLoading(true);
        let result = await executeGetApi(`${GET_PAGE_BY_NAME}${name}`);
        if (result?.data?.success) {
          setLoading(false);
          return result.data.data;
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );
  const values = {
    pages,
    isPageCreated,
    isPageUpdated,
    getAllStaticPages: useCallback(
      (params) => {
        getAllStaticPages(params);
      },
      [getAllStaticPages]
    ),
    onUpdateStaticPage: useCallback(
      (values) => {
        onUpdateStaticPage(values);
      },
      [onUpdateStaticPage]
    ),
    getPageByName: useCallback(
      async (name) => {
        return await getPageByName(name);
      },
      [getPageByName]
    ),
  };
  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
};
