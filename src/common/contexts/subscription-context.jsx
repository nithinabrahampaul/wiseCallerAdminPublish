import React, { useState, createContext, useCallback } from "react";
import useRazorPay from "react-razorpay";
import { executeGetApi, executePostApi } from "../apis";
import { GET_SUBSCRIPTIONS_API, PAYMENT_ORDER_API } from "../apis/api-urls";
import { useLoader } from "../hooks";

export const SubscriptionContext = createContext();

export const SubscrptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { setLoading } = useLoader();
  const razorPay = useRazorPay();

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

  const onPlanSubscribe = useCallback(
    async (values) => {
      try {
        console.log(values);
        setLoading(true);
        let result = await executePostApi(PAYMENT_ORDER_API, {
          amount: values.price,
        });
        if (result?.data?.success) {
          let payload = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            name: "Wisecaller Pvt Ltd.",
            order_id: result.data.data.id,
            amount: result.data.data.amount_due,
            handler: (result) => {
              console.log(result);
              setLoading(false);
            },
            prefill: {
              name: values.company_name,
              email: values.company_email,
            },
          };

          const pay = new razorPay(payload);
          pay.open();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [setLoading]
  );

  let value = {
    subscriptions,
    getOrganizationSubscriptions: useCallback(() => {
      getOrganizationSubscriptions();
    }, [getOrganizationSubscriptions]),
    onPlanSubscribe: useCallback(
      (values) => {
        onPlanSubscribe(values);
      },
      [onPlanSubscribe]
    ),
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
