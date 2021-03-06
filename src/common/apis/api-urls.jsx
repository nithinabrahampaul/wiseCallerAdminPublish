const organizationUrl = `${process.env.REACT_APP_API}organization-service/api/v1/`;
const subscriptionUrl = `${process.env.REACT_APP_API}subscription-service/api/v1/`;
const notificationUrl = `${process.env.REACT_APP_API}notification-service/api/v1/`;
export const ORGANIZATON_LOGIN_API = `${organizationUrl}auth/login`;
export const ORGANIZATON_REGISTER_API = `${organizationUrl}auth/register`;
export const ORGANIZATON_VERIFY_API = `${organizationUrl}auth/verify`;
export const ORGANIZATON_RESEND_OTP_API = `${organizationUrl}auth/resend-otp`;
export const ORGANIZATON_LIST_API = `${organizationUrl}list`;
export const ORGANIZATION_PROFILE_API = `${organizationUrl}organization/get-profile`;
export const GET_SUBSCRIPTIONS_API = `${subscriptionUrl}subscription`;
export const GET_PLANS_API = `${subscriptionUrl}plan`;
export const PAYMENT_ORDER_API = `${subscriptionUrl}payment/order`;
export const ORGANIZATION_SUBSCRIPTION_PAYMENT = `${subscriptionUrl}payment/organization-payment`;
export const GET_ORGANIZATION_USERS = `${organizationUrl}organization/get-organization-users`;
export const GET_ALL_COUPONS = `${organizationUrl}coupon`;
export const GET_ALL_USERS = `${organizationUrl}user`;
export const GET_ALL_ORGANIZATIONS = `${organizationUrl}organization`;
export const GET_ALL_SUBSCRIPTIONS = `${organizationUrl}subscription`;
export const UPDATE_SUBSCRIPTION = `${organizationUrl}subscription/update`;
export const RENEW_ORGANIZATION_SUBSCRIPTION = `${subscriptionUrl}payment/renew-organization-subscription`;
export const UPDATE_ORGANIZATION_PROFILE = `${organizationUrl}organization/update-organization-profile`;
export const REVOKE_ORGANIZATION_EMPLOYEE = `${organizationUrl}plan/revoke-organization-employee-plan`;
export const DEACTIVATE_COUPON = `${organizationUrl}coupon/deactivate-coupon`;
export const ORGANIZATION_OVERVIEW = `${organizationUrl}organization/overview`;
export const GET_ALL_NOTES = `${organizationUrl}notes`;
export const UPDATE_NOTES = `${organizationUrl}notes/update`;
export const UPDATE_ADMIN_STATIC_PAGES = `${organizationUrl}pages/update`;
export const GET_ALL_ADMIN_STATIC_PAGES = `${organizationUrl}pages`;
export const GET_ALL_GLOBAL_TYPES = `${organizationUrl}global-types`;
export const CREATE_GLOBAL_TYPES = `${organizationUrl}global-types/update`;
export const GET_ALL_USER_STATUS = `${organizationUrl}user-status`;
export const UPDATE_USER_STATUS = `${organizationUrl}user-status/update`;
export const SEND_CUSTOM_NOTIFICATION = `${notificationUrl}notification/send-custom-notification`;
export const EXPORT_USER_CSV = `${organizationUrl}user/export-csv`;
export const EXPORT_COUPON_CSV = `${organizationUrl}coupon/export-csv`;
export const DEACTIVATE_USER = `${organizationUrl}user/deactivate`;
export const CHANGE_USER_PLAN = `${organizationUrl}user/change-plan`;
export const DELETE_ORGANIZATION_BY_ADMIN = `${organizationUrl}organization/delete-by-admin`;
export const EXPORT_ORGANIZATION_CSV = `${organizationUrl}organization/export-csv`;
export const UPDATE_ADMIN_COUPON = `${organizationUrl}coupon/update`;
export const GENERATE_USER_INVOICE = `${subscriptionUrl}payment/generate-invoice`;
export const GET_ALL_PLANS = `${organizationUrl}plan`;
export const UPDATE_PLAN = `${organizationUrl}plan/update`;
