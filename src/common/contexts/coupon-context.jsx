import React, { createContext, useState, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executePostApi, executePutApi } from "../apis";
import {
  CHANGE_ORGANIZATION_SUBSCRIPTION,
  UPDATE_COUPON_STATUS,
  EXPORT_COUPON_CSV,
  GET_ALL_COUPONS,
  UPDATE_ADMIN_COUPON,
} from "../apis/api-urls";
import { useDownload } from "../hooks";

export const CouponContext = createContext({});

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [isRefetch, setRefetch] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { downloadCSV } = useDownload();

  const getAllCoupons = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_COUPONS, params);
        if (result?.data?.success) {
          setCoupons(result.data.data);
          setRefetch(false);
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
    async (id, payload) => {
      setLoading(true);
      let result = await executePostApi(
        `${UPDATE_COUPON_STATUS}/${id}`,
        payload
      );
      if (result?.data?.success) {
        toast.success("Coupon deactivated!");
      } else {
        toast.error(result?.data.message);
      }
      setRefetch(true);
      setLoading(false);
    },
    [setLoading]
  );

  const onExportCouponCSV = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(EXPORT_COUPON_CSV, params);
        if (result.data?.success) {
          downloadCSV(result.data.data, "coupon", "csv");
          toast.success("CSV exported successfully");
        } else {
          toast.error(result.data?.message);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [setLoading, downloadCSV]
  );

  const onCreateCoupon = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(UPDATE_ADMIN_COUPON, values);
        if (result?.data?.success) {
          setRefetch(true);
          toast.success("Coupon created successfully!");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onCouponChange = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePutApi(
          CHANGE_ORGANIZATION_SUBSCRIPTION,
          values
        );
        if (result?.data?.success) {
          toast.success("Coupon plan changed!");
          setRefetch(true);
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
    isRefetch,
    getAllCoupons: useCallback(
      (params) => {
        getAllCoupons(params);
      },
      [getAllCoupons]
    ),
    onDeactivateCoupon: useCallback(
      (id, payload) => {
        onDeactivateCoupon(id, payload);
      },
      [onDeactivateCoupon]
    ),
    onExportCouponCSV: useCallback(
      (params) => {
        onExportCouponCSV(params);
      },
      [onExportCouponCSV]
    ),
    onCreateCoupon: useCallback(
      (values) => {
        onCreateCoupon(values);
      },
      [onCreateCoupon]
    ),
    onCouponChange: useCallback(
      (values) => {
        onCouponChange(values);
      },
      [onCouponChange]
    ),
  };
  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
};
