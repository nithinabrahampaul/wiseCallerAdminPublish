import * as yup from "yup";

export const notesFormValidation = yup.object().shape({
  text: yup.string().required("Text is required"),
  type: yup.string().required("Please select any type"),
});

export const subscriptionFormValidation = yup.object().shape({
  title: yup.string().required("Name is required"),
});

export const organizationFormValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const statusFormValidation = yup.object().shape({
  status: yup.string().required("Status is required"),
  icon_style: yup.string().required("Please select any icon style"),
  parentId: yup.array().required("Please select any user status"),
});

export const couponFormValidation = yup.object().shape({
  coupon_code: yup.string().required("Nams is required"),
  price: yup.string().required("Price is required"),
  discount_price: yup.string().required("Discount is required"),
  subscription: yup.string().required("Please select subscription"),
});

export const planFormValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  subscription: yup.string().required("Please select subscription"),
  amount: yup.string().required("Price is required"),
  discount: yup.string().required("Discount is required"),
  minSlab: yup.string().required("Minimum slab is required"),
  maxSlab: yup.string().required("Maximum slab is required"),
});

export const featureFormValidation = yup.object().shape({
  feature: yup.string().required("Feature is required"),
  text: yup.string().required("Description is required"),
});
