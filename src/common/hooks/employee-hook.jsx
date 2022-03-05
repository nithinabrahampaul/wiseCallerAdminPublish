import { useContext } from "react";
import { EmployeeContext } from "../contexts";

export const useEmployee = () => useContext(EmployeeContext);
