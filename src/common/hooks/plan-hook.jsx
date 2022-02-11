import { useContext } from "react";
import { PlanContext } from "../contexts";

export const usePlans = () => useContext(PlanContext);
