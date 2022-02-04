import { useContext } from "react";
import { LoaderContext } from "../contexts";

export const useLoader = () => useContext(LoaderContext);
