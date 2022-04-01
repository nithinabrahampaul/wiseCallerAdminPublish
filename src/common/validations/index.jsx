import * as yup from "yup";
export { loginFormValidation } from "./auth";

export const notificationFormValidation = yup.object().shape({
  title: yup.string().required("Title is required"),
  text: yup.string().required("Content is required"),
});

export const rangeFilterFormValidation = yup.object().shape({
  start_date: yup.string().required("Start date is required"),
  end_date: yup.string().required("End date is required"),
});
