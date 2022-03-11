import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { executeGetApi, executePostApi } from "../apis";
import {
  GET_ALL_ADMIN_STATIC_PAGES,
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
          ? `${GET_ALL_ADMIN_STATIC_PAGES}?page=${params.page}&&limit=${params.limit}`
          : GET_ALL_ADMIN_STATIC_PAGES;
        let result = await executeGetApi(API_URL);

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
        console.log(error);
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
  };
  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
};
