import * as yup from "yup";

export const loginFormValidation = yup.object().shape({
  phone_no: yup.string().required("Mobile number is required"),
});

export const registerFormValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phone_no: yup.string().required("Mobile number is required"),
  website: yup.string().required("Website is required"),
});

export const otpFormValidation = yup.object().shape({
  phone_no: yup.string().required("Mobile number is required"),
  otp: yup.string().required("OTP is required"),
});

export const companyFormValidation = yup.object().shape({
  company_name: yup.string().required("Name is required"),
  company_email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  contact_name: yup.string().required("Name is required"),
  contact_email: yup.string().required("Email is required"),
  contact_phone: yup.string().required("Phone is required"),
});
