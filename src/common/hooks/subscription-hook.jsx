import { useContext } from "react";
import { SubscriptionContext } from "../contexts";

export const useSubscription = () => useContext(SubscriptionContext);
