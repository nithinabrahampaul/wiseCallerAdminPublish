import { useContext } from "react";
import { PageContext } from "../contexts";

export const usePages = () => useContext(PageContext);
