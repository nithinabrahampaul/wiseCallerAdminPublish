const rootRoutes = {
  root: "/",
  login: "/auth/login",
  register: "/auth/register",
};

const organizationRoutes = {
  organizationDashboard: "/organization/dashboard",
  organizationList: "/organization/list",
};

const adminRoutes = {
  adminDashboard: "/admin/dashboard",
};

export const componentRoutes = {
  ...rootRoutes,
  ...organizationRoutes,
  ...adminRoutes,
};
