const rootRoutes = {
  root: "/",
  login: "/auth/login",
  register: "/auth/register",
  pricing: "/subscription/pricing",
  organizationPayment: "/organization/payment",
  tokenExpired: "/token-expired",
  dynamicPage: "/:page",
};

const organizationRoutes = {
  organizationDashboard: "/organization/dashboard",
  organizationList: "/organization/list",
  organizationReports: "/organization/reports",
  organizationEmployees: "/organization/employees",
  organizationCoupons: "/organization/coupons",
  organizationAccountProfile: "/organization/account/profile",
  organizationAccountSubscription: "/organization/account/subscription",
  organizationTemplates: "/organization/templates",
};

const adminRoutes = {
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminOrganizations: "/admin/organizations",
  adminSubscriptions: "/admin/subscriptions",
  adminStatus: "/admin/status",
  adminCoupon: "/admin/coupon",
  adminNotes: "/admin/notes",
  adminPages: "/admin/pages",
  adminGlobalTypes: "/admin/global-types",
  adminPlans: "/admin/plans",
  adminTemplates: "/admin/templates",
  adminAccountProfile: "/admin/account/profile",
  adminSubStatus: "/admin/sub-status"
};

export const componentRoutes = {
  ...rootRoutes,
  ...organizationRoutes,
  ...adminRoutes,
};
