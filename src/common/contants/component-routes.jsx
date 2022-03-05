const rootRoutes = {
  root: "/",
  login: "/auth/login",
  register: "/auth/register",
  pricing: "/subscription/pricing",
};

const organizationRoutes = {
  organizationDashboard: "/organization/dashboard",
  organizationList: "/organization/list",
  organizationReports: "/organization/reports",
  organizationEmployees: "/organization/employees",
  organizationCoupons: "/organization/coupons",
  organizationAccountProfile: "/organization/account/profile",
  organizationAccountSubscription: "/organization/account/subscription",
};

const adminRoutes = {
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminOrganizations: "/admin/organizations",
  adminSubscriptions: "/admin/subscriptions",
  adminStatus: "/admin/status",
  adminNotes: "/admin/notes",
  adminPages: "/admin/pages",
};

export const componentRoutes = {
  ...rootRoutes,
  ...organizationRoutes,
  ...adminRoutes,
};
