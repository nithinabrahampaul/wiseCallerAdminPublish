import React, { createContext, useState, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executeGetApi, executePostApi } from "../apis";
import { DEACTIVATE_COUPON, GET_ALL_COUPONS } from "../apis/api-urls";

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

  const onDeactivateCoupon = useCallback(
    async (id) => {
      setLoading(true);
      let result = await executeGetApi(`${DEACTIVATE_COUPON}/${id}`);
      if (result?.data?.success) {
        toast.success("Coupon deactivated!");
      } else {
        toast.error(result?.data.message);
      }
      setLoading(false);
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
    onDeactivateCoupon: useCallback(
      (id) => {
        onDeactivateCoupon(id);
      },
      [onDeactivateCoupon]
    ),
  };
  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
};
