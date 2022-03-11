import { useContext } from "react";
import { GlobalTypesContext } from "../contexts";

export const useGlobalTypes = () => useContext(GlobalTypesContext);
