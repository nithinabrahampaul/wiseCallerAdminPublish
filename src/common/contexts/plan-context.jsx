import { useContext } from "react";
import { useCallback, useState, createContext } from "react";
import { LoaderContext } from ".";
import { executeGetApi } from "../apis";
import { GET_PLANS_API } from "../apis/api-urls";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  const getSubscriptionPlans = useCallback(
    async (subscription) => {
      try {
        setLoading(true);
        let result = await executeGetApi(
          `${GET_PLANS_API}?subscription=${subscription}`
        );
        if (result?.data?.success) {
          setPlans(result.data.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  let value = {
    plans,
    getSubscriptionPlans: useCallback(
      (subscription) => {
        getSubscriptionPlans(subscription);
      },
      [getSubscriptionPlans]
    ),
  };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
