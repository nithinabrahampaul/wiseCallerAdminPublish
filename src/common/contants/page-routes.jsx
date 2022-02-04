import { componentRoutes } from ".";
import Pages from "../../pages";
import Login from "../../pages/auth/login";
import { MainLayout } from "../../pages/layouts/main-layout";
import { BlankLayout } from "../../pages/layouts/blank-layout";
import Register from "../../pages/auth/register";
import OrganizationDashboard from "../../pages/organization/dashboard";
import OrganizationList from "../../pages/organization/list/list";

export const rootRoutes = [
  {
    path: componentRoutes.root,
    component: Pages,
  },
  {
    path: componentRoutes.login,
    component: Login,
    layout: BlankLayout,
  },
  {
    path: componentRoutes.register,
    component: Register,
    layout: BlankLayout,
  },
];

export const adminRoutes = [];

export const organizationRoutes = [
  {
    path: componentRoutes.organizationDashboard,
    component: OrganizationDashboard,
    layout: MainLayout,
  },
  {
    path: componentRoutes.organizationList,
    component: OrganizationList,
    layout: MainLayout,
  },
];

export const pageRoutes = [
  ...rootRoutes,
  ...adminRoutes,
  ...organizationRoutes,
];
