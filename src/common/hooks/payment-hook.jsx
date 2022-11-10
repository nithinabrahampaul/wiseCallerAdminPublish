import { useContext } from "react";
import { PaymentContext } from "../contexts";

export const usePayment = () => useContext(PaymentContext);
