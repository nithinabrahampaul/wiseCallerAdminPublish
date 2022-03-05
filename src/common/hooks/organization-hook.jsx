import { useContext } from "react";
import { OrganizationContext } from "../contexts";

export const useOrganization = () => useContext(OrganizationContext);
