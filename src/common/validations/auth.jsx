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
