import { useContext } from "react";
import { useCallback, useState, createContext } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executeGetApi, executePostApi } from "../apis";
import { GET_PLANS_API, REVOKE_ORGANIZATION_EMPLOYEE } from "../apis/api-urls";

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

  const onRevokePlan = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(
          `${REVOKE_ORGANIZATION_EMPLOYEE}`,
          values
        );
        if (result?.data?.success) {
          toast.success("Plan revoked successfully!");
          setLoading(false);
        } else {
          toast.error(result?.data?.message);
        }
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
    onRevokePlan: useCallback(
      (values) => {
        onRevokePlan(values);
      },
      [onRevokePlan]
    ),
  };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
