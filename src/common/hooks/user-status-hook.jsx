import { useContext } from "react";
import { UserStatusContext } from "../contexts/user-status-context";

export const useUserStatus = () => useContext(UserStatusContext);
