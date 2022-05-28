import { useContext } from "react";
import { AppCookiesContext } from "../contexts";

export const useAppCookies = () => useContext(AppCookiesContext);
