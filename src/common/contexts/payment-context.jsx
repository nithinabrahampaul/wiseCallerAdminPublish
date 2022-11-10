import { useContext } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";
import { executePostApi } from "../apis";
import {
  PAYMENT_ORDER_API,
  REGENERATE_PAYMENT,
  VERIFY_PAYMENT_OTP,
} from "../apis/api-urls";
import { LoaderContext } from "./loader-context";

export const PaymentContext = createContext({
  onVerifyPaymentOTP: async (values) => {},
});

export const PaymentProvider = ({ children }) => {
  const { setLoading } = useContext(LoaderContext);
  const razorPay = useRazorpay();

  const onVerifyPaymentOTP = useCallback(
    async (values) => {
      setLoading(true);
      let result = await executePostApi(VERIFY_PAYMENT_OTP, values);
      if (result.data.success) {
        let order = await executePostApi(PAYMENT_ORDER_API, {
          amount: result?.data?.data?.amount,
        });

        if (order?.data?.success) {
          let payload = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            name: "Wisecaller Pvt Ltd.",
            order_id: order.data.data.id,
            amount: order.data.data.amount_due,
            handler: async (response) => {
              await executePostApi(REGENERATE_PAYMENT, {
                subscription: result?.data?.data?.subscription,
                user_subscription: result?.data?.data?.user_subscription,
                user: values?.user,
                amount: result?.data?.data?.amount,
                transactionId: order.data.data.id,
                url: values?.url,
              });
              setLoading(false);
            },
          };
          const pay = new razorPay(payload);
          pay.open();
        } else {
        }
      } else {
        toast.error(result?.data?.message);
      }
    },
    [razorPay, setLoading]
  );

  let value = {
    onVerifyPaymentOTP: useCallback(
      async (values) => {
        return await onVerifyPaymentOTP(values);
      },
      [onVerifyPaymentOTP]
    ),
  };
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};
