import React, { createContext, useState, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executePostApi } from "../apis";
import { GET_ALL_COUPONS } from "../apis/api-urls";

export const CouponContext = createContext({});

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  const getAllCoupons = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_COUPONS, params);
        if (result?.data?.success) {
          setCoupons(result.data.data);
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

  const value = {
    coupons,
    getAllCoupons: useCallback(
      (params) => {
        getAllCoupons(params);
      },
      [getAllCoupons]
    ),
  };
  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
};
