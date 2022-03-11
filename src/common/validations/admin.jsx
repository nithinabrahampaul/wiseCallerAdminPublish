import * as yup from "yup";

export const notesFormValidation = yup.object().shape({
  text: yup.string().required("Text is required"),
  type: yup.string().required("Please select any type"),
  is_custom: yup.string().required("Please select custom option"),
  display_to: yup.string().required("Please select display option"),
  auto_sms: yup.string().required("Please select auto sms option"),
});

export const statusFormValidation = yup.object().shape({
  status: yup.string().required("Status is required"),
  applicable_types: yup.array().required("Please select any types"),
  order: yup.string().required("Order is required"),
  icon_style: yup.string().required("Please select any icon style"),
});
