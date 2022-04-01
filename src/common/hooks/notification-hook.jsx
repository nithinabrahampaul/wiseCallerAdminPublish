import { useContext } from "react";
import { NotificationContext } from "../contexts";

export const useNotificaton = () => useContext(NotificationContext);
