import { useContext } from "react";
import { TemplateContext } from "../contexts";

export const useTemplate = () => useContext(TemplateContext);
