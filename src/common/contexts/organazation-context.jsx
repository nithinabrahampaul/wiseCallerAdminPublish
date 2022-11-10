import React, { createContext, useContext, useState } from "react";
import { LoaderContext } from "./";
import {
  executeGetApi,
  setOrganizationCookies,
  executePostApi,
  executeDeleteApi,
  executePostFormApi,
} from "../apis/base-api";
import {
  CHECK_PAYMENT_TOKEN,
  DELETE_ORGANIZATION_BY_ADMIN,
  DIRECT_PAYMENT,
  EXPORT_ORGANIZATION_CSV,
  GET_ALL_ORGANIZATIONS,
  GET_ORGANIZATION_USERS,
  ORGANIZATION_OVERVIEW,
  ORGANIZATION_PROFILE_API,
  PAYMENT_ORDER_API,
  REGENERATE_PAYMENT_TOKEN,
  UPDATE_ORGANIZATION_PROFILE,
  UPLOAD_IMAGE_ON_S3,
} from "../apis/api-urls";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDownload, useGenerateVoucher } from "../hooks";
import { convertToBase64 } from "../utils/convert-base64";
import { AppCookiesContext } from "./app-cookies";
import useRazorPay from "react-razorpay";
import moment from "moment";

export const OrganizationContext = createContext({});
export const OrganizationProvider = ({ children }) => {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [isUpdated, setUpdated] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [overview, setOverview] = useState(null);
  const [isPaymentDone, setPaymentDone] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { onUpdateCookies } = useContext(AppCookiesContext);
  const { downloadCSV } = useDownload();
  const razorPay = useRazorPay();
  const generateVoucher = useGenerateVoucher();

  const getOrganizationDetails = useCallback(async () => {
    try {
      setLoading(true);
      let result = await executeGetApi(ORGANIZATION_PROFILE_API);
      if (result?.data?.success) {
        onUpdateCookies(result.data.data);
        setOrganizationCookies(result.data.data);
        setOrganization(result.data.data);
      }
      setLoading(false);
      if (result) {
      }
    } catch (error) {}
  }, [setLoading, onUpdateCookies]);

  const getOrganizationEmployees = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executeGetApi(
          `${GET_ORGANIZATION_USERS}?page=${params.page}&limit=${params.limit}`
        );
        if (result?.data?.success) {
          setEmployees(result.data.data);
        } else {
          toast.error(result.data.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const getAllOrganizations = useCallback(
    async (params) => {
      setLoading(true);
      setUpdated(false);
      let result = await executePostApi(GET_ALL_ORGANIZATIONS, params);
      if (result?.data?.success) {
        setAllOrganizations(result.data.data);
      } else {
        toast.error(result.data.message);
      }
      setLoading(false);
    },
    [setLoading]
  );

  const onCreateOrganization = useCallback(
    async (values) => {
      setLoading(true);
      if (values.profile?.length) {
        values.profile = await convertToBase64(values.profile[0]);
      }
      let result = await executePostApi(UPDATE_ORGANIZATION_PROFILE, values);
      if (result?.data?.success) {
        // setOrganization(result.data.data);
        setUpdated(true);
        toast.success("Organization created successfully");
        setLoading(false);
        return result.data;
      } else {
        toast.error(result?.data.message);
      }
    },
    [setLoading]
  );

  const onUpdateOrganization = useCallback(
    async (values) => {
      setLoading(true);
      let formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key === "profile") {
          if (value) {
            formData.set(key, value[0]);
          }
        } else {
          formData.set(key, value);
        }
      }
      let result = await executePostFormApi(
        UPDATE_ORGANIZATION_PROFILE,
        formData
      );
      if (result?.data?.success) {
        setOrganization(result.data.data);
        setUpdated(true);
        toast.success("Organization updated successfully");
      } else {
        toast.error(result?.data.message);
      }
      setLoading(false);
    },
    [setLoading]
  );

  const getOrganizationOverview = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(ORGANIZATION_OVERVIEW, params);
        if (result?.data?.success) {
          setOverview(result.data.data);
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

  const onDeleteOrganization = useCallback(
    async (id) => {
      try {
        setLoading(true);
        let result = await executeDeleteApi(
          `${DELETE_ORGANIZATION_BY_ADMIN}/${id}`
        );
        if (result?.data?.success) {
          setUpdated(true);
          toast.success("Organization deleted successfully!");
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

  const onExportOrganizationCSV = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(EXPORT_ORGANIZATION_CSV, params);
        if (result.data?.success) {
          downloadCSV(result.data.data, "organization", "csv");
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

  const onHandlePayment = useCallback(
    async (payment, form) => {
      try {
        let payment_payload = {
          transactionId: payment.data.data.id,
          subscription: form.subscription._id,
          amount: form.price + (form.price * 18) / 100,
          paymentFor: "Organization Coupon",
          status: "SUCCESS",
          mode: "ONLINE",
          quantity: form.quantity,
          coupon_expiry_date: moment()
            .add(form.subscription.duration, "months")
            .toDate(),
          coupon_code: generateVoucher,
          user: form._id,
          email: form.email,
        };

        let organization_payment = await executePostApi(
          DIRECT_PAYMENT,
          payment_payload
        );
        if (organization_payment?.data?.success) {
          setPaymentDone(true);
          setLoading(false);
          toast.success("You have successfully subscribed");
          return organization_payment.data;
        } else {
          setLoading(false);
        }
      } catch (error) {}
    },
    [setLoading, generateVoucher]
  );

  const onOrganizationPayment = useCallback(
    async (values) => {
      try {
        setPaymentDone(false);
        let payment = await executePostApi(PAYMENT_ORDER_API, {
          amount: values.price + (values.price * 18) / 100,
        });

        if (payment?.data?.success) {
          let payload = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            name: "Wisecaller Pvt Ltd.",
            order_id: payment.data.data.id,
            amount: payment.data.data.amount_due,
            handler: async (result) => {
              await onHandlePayment(payment, values);
            },
            prefill: {
              name: values.company_name,
              email: values.company_email,
            },
          };

          const pay = new razorPay(payload);
          pay.open();
        } else {
          setLoading(false);
          toast.error(payment.data.message);
        }
      } catch (error) {}
    },
    [onHandlePayment, razorPay, setLoading]
  );

  const onRegenaratePayment = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let { data } = await executePostApi(REGENERATE_PAYMENT_TOKEN, values);
        if (data?.success) {
          setLoading(false);
          return data.paymentUrl;
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const uploadImageOnAws = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          formData.set(key, value);
        }
        let { data } = await executePostApi(UPLOAD_IMAGE_ON_S3, formData);
        if (data.success) {
          setLoading(false);
          return data.data;
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onCheckPayment = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let { data } = await executePostApi(CHECK_PAYMENT_TOKEN, values);
        if (data?.success) {
          setLoading(false);
          return data?.validate;
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  let value = {
    organization,
    isUpdated,
    employees,
    overview,
    allOrganizations,
    setOrganization,
    isPaymentDone,
    getOrganizationDetails: useCallback(() => {
      getOrganizationDetails();
    }, [getOrganizationDetails]),
    getOrganizationEmployees: useCallback(
      (params) => {
        getOrganizationEmployees(params);
      },
      [getOrganizationEmployees]
    ),
    getAllOrganizations: useCallback(
      (params) => {
        getAllOrganizations(params);
      },
      [getAllOrganizations]
    ),
    onCreateOrganization: useCallback(
      async (values) => {
        return await onCreateOrganization(values);
      },
      [onCreateOrganization]
    ),
    onUpdateOrganization: useCallback(
      (values) => {
        onUpdateOrganization(values);
      },
      [onUpdateOrganization]
    ),
    getOrganizationOverview: useCallback(
      (params) => {
        getOrganizationOverview(params);
      },
      [getOrganizationOverview]
    ),
    onDeleteOrganization: useCallback(
      (id) => {
        onDeleteOrganization(id);
      },
      [onDeleteOrganization]
    ),
    onExportOrganizationCSV: useCallback(
      (params) => {
        onExportOrganizationCSV(params);
      },
      [onExportOrganizationCSV]
    ),
    onOrganizationPayment: useCallback(
      async (values) => {
        return await onOrganizationPayment(values);
      },
      [onOrganizationPayment]
    ),
    onRegenaratePayment: useCallback(
      async (values) => {
        return await onRegenaratePayment(values);
      },
      [onRegenaratePayment]
    ),
    uploadImageOnAws: useCallback(
      async (values) => {
        return await uploadImageOnAws(values);
      },
      [uploadImageOnAws]
    ),
    onCheckPayment: useCallback(
      async (values) => {
        return await onCheckPayment(values);
      },
      [onCheckPayment]
    ),
  };
  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};
