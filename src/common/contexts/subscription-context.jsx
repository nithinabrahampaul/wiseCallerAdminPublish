import moment from "moment";
import React, { useState, createContext, useCallback } from "react";
import useRazorPay from "react-razorpay";
import { toast } from "react-toastify";
import { executeGetApi, executePostApi } from "../apis";
import {
  GET_ALL_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_API,
  ORGANIZATION_SUBSCRIPTION_PAYMENT,
  ORGANIZATON_VERIFY_API,
  PAYMENT_ORDER_API,
  RENEW_ORGANIZATION_SUBSCRIPTION,
} from "../apis/api-urls";
import { setUserCookies } from "../apis/base-api";
import { useLoader, useGenerateVoucher, useOrganization } from "../hooks";

export const SubscriptionContext = createContext();

export const SubscrptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isSubscriptionDone, setSubscriptionDone] = useState(false);
  const [isSubscriptionRenewed, setSubscriptionRenewed] = useState(false);
  const { setLoading } = useLoader();
  const razorPay = useRazorPay();
  const generateVoucher = useGenerateVoucher();
  const { getOrganizationDetails } = useOrganization();

  const getOrganizationSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      let result = await executeGetApi(
        `${GET_SUBSCRIPTIONS_API}?type=ORGANIZATION`
      );
      if (result?.data?.success) {
        setSubscriptions(result.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [setLoading]);

  const onOrganizationPayment = useCallback(
    async (payment, companyForm) => {
      try {
        let payment_payload = {
          transactionId: payment.data.data.id,
          subscription: companyForm.subscription._id,
          amount: companyForm.price + (companyForm.price * 18) / 100,
          paymentFor: "Organization Coupon",
          status: "SUCCESS",
          mode: "ONLINE",
          quantity: companyForm.quantity,
          coupon_expiry_date: moment()
            .add(companyForm.subscription.duration, "months")
            .toISOString(),
          coupon_code: generateVoucher,
        };

        let organization_payment = await executePostApi(
          ORGANIZATION_SUBSCRIPTION_PAYMENT,
          payment_payload
        );
        if (organization_payment?.data?.success) {
          setSubscriptionDone(true);
          setLoading(false);
          toast.success("You have successfully subscribed");
        } else {
          setLoading(false);
        }
      } catch (error) {}
    },
    [setLoading, generateVoucher]
  );

  const onPlanSubscribe = useCallback(
    async (values) => {
      const { otpForm, companyForm } = values;
      try {
        setLoading(true);
        let result = await executePostApi(ORGANIZATON_VERIFY_API, otpForm);
        if (result?.data?.success) {
          await setUserCookies(result.data.data);
          let payment = await executePostApi(PAYMENT_ORDER_API, {
            amount: companyForm.price + (companyForm.price * 18) / 100,
          });
          await getOrganizationDetails();
          if (payment?.data?.success) {
            let payload = {
              key: process.env.REACT_APP_RAZORPAY_KEY,
              name: "Wisecaller Pvt Ltd.",
              order_id: payment.data.data.id,
              amount: payment.data.data.amount_due,
              handler: async (result) => {
                await onOrganizationPayment(payment, companyForm);
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
        } else {
          setLoading(false);
          toast.error(result.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [setLoading, razorPay, onOrganizationPayment, getOrganizationDetails]
  );

  const getAllSubscriptions = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_SUBSCRIPTIONS, params);
        if (result?.data?.success) {
          setSubscriptions(result.data.data);
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

  const onRenewSubscription = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let amount_payload = {
          amount: values.price,
          gst_amount: 0,
          cess_amount: 0,
        };

        if (values?.subscription?.gst_percentage) {
          let gst_percentage = values.subscription.gst_percentage;
          let cess_percentage = values.subscription.cess_percentage;
          amount_payload.gst_amount =
            (amount_payload.amount * gst_percentage) / 100;
          amount_payload.cess_amount =
            (amount_payload.amount * cess_percentage) / 100;
        } else {
          let cess_percentage = values.subscription.cess_percentage;
          amount_payload.cess_amount =
            (amount_payload.amount * cess_percentage) / 100;
        }

        let order = await executePostApi(PAYMENT_ORDER_API, {
          amount:
            amount_payload.amount +
            amount_payload.gst_amount +
            amount_payload.cess_amount,
        });
        if (order?.data?.success) {
          let payload = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            name: "Wisecaller Pvt Ltd.",
            order_id: order.data.data.id,
            amount: order.data.data.amount_due,
            handler: async (result) => {
              let renew_result = await executePostApi(
                RENEW_ORGANIZATION_SUBSCRIPTION,
                {
                  transactionId: order.data.data.id,
                  subscription: values.subscription._id,
                  paymentFor: "Organization Renew Coupon",
                  status: "SUCCESS",
                  mode: "ONLINE",
                  quantity: values.quantity,
                  coupon_expiry_date: moment()
                    .add(values.subscription.duration, "months")
                    .toISOString(),
                  coupon_code: generateVoucher,
                  amount:
                    amount_payload.amount +
                    amount_payload.gst_amount +
                    amount_payload.cess_amount,
                  plan: values.plan,
                }
              );
              if (renew_result?.data?.success) {
                toast.success(renew_result?.data?.message);
              } else {
                toast.error(renew_result?.data?.message);
              }
              setSubscriptionRenewed(true);
              setLoading(false);
            },
          };
          const pay = new razorPay(payload);
          pay.open();
        } else {
          toast.error(order?.data.message);
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading, razorPay, generateVoucher]
  );

  let value = {
    subscriptions,
    isSubscriptionDone,
    setSubscriptionDone,
    isSubscriptionRenewed,
    setSubscriptionRenewed,
    getOrganizationSubscriptions: useCallback(() => {
      getOrganizationSubscriptions();
    }, [getOrganizationSubscriptions]),
    onPlanSubscribe: useCallback(
      (values) => {
        onPlanSubscribe(values);
      },
      [onPlanSubscribe]
    ),
    getAllSubscriptions: useCallback(
      (params) => {
        getAllSubscriptions(params);
      },
      [getAllSubscriptions]
    ),
    onRenewSubscription: useCallback(
      (params) => {
        onRenewSubscription(params);
      },
      [onRenewSubscription]
    ),
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
