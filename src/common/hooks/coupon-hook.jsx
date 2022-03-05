import { useContext } from "react";
import { CouponContext } from "../contexts";

export const useCoupon = () => useContext(CouponContext);
