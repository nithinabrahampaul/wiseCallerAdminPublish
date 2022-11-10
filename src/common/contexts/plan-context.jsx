import { useContext } from "react";
import { useCallback, useState, createContext } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from ".";
import { executePostApi } from "../apis";
import {
  GET_ALL_PLANS,
  GET_PLANS_API,
  REVOKE_ORGANIZATION_EMPLOYEE,
  UPDATE_PLAN,
} from "../apis/api-urls";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [isRefetched, setRefetched] = useState(false);
  const { setLoading } = useContext(LoaderContext);

  const getSubscriptionPlans = useCallback(
    async (subscription) => {
      try {
        setLoading(true);
        let result = await executePostApi(`${GET_PLANS_API}`, {
          subscription: subscription,
        });
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

  const getPaginatedPlans = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_PLANS, params);
        if (result?.data?.success) {
          setAllPlans(result.data.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onCreatePlans = useCallback(
    async (values) => {
      try {
        setRefetched(false);
        setLoading(true);
        let result = await executePostApi(UPDATE_PLAN, values);
        if (result?.data?.success) {
          setRefetched(true);
          toast.success("Plan created successfully");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onUpdatePlans = useCallback(
    async (values) => {
      try {
        setRefetched(false);
        setLoading(true);
        let result = await executePostApi(UPDATE_PLAN, values);
        if (result?.data?.success) {
          setRefetched(true);
          toast.success("Plan updated successfully");
        }
        setRefetched(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onDeletePlans = useCallback(
    async (values) => {
      try {
        setRefetched(false);
        setLoading(true);
        let result = await executePostApi(UPDATE_PLAN, values);
        if (result?.data?.success) {
          setRefetched(true);
          toast.success("Plan deleted successfully");
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
    allPlans,
    isRefetched,
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
    getPaginatedPlans: useCallback(
      (params) => {
        getPaginatedPlans(params);
      },
      [getPaginatedPlans]
    ),
    onCreatePlans: useCallback(
      (values) => {
        onCreatePlans(values);
      },
      [onCreatePlans]
    ),
    onUpdatePlans: useCallback(
      (values) => {
        onUpdatePlans(values);
      },
      [onUpdatePlans]
    ),
    onDeletePlans: useCallback(
      (values) => {
        onDeletePlans(values);
      },
      [onDeletePlans]
    ),
  };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
