import { componentRoutes } from ".";
import Pages from "../../pages";
import Login from "../../pages/auth/login";
import { MainLayout } from "../../pages/layouts/main-layout";
import { BlankLayout } from "../../pages/layouts/blank-layout";
import Register from "../../pages/auth/register";
import OrganizationDashboard from "../../pages/organization/dashboard";
import OrganizationList from "../../pages/organization/list/list";
import OrganizationPricing from "../../pages/organization/pricing";
import OrganizationEmployees from "../../pages/organization/reports/employees";
import OrganizationCoupons from "../../pages/organization/reports/coupons";
import AdminDashboard from "../../pages/admin/dashboard";
import AdminUsers from "../../pages/admin/users";
import AdminOrganization from "../../pages/admin/organizations";
import AdminSubscriptions from "../../pages/admin/subscriptions";
import OrganizationAccountProfile from "../../pages/organization/accout/profile";
import OrganizationAccountSubscription from "../../pages/organization/accout/subscription";

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
  {
    path: componentRoutes.pricing,
    component: OrganizationPricing,
    layout: BlankLayout,
  },
];

export const adminRoutes = [
  {
    path: componentRoutes.adminDashboard,
    component: AdminDashboard,
    layout: MainLayout,
  },
  {
    path: componentRoutes.adminUsers,
    component: AdminUsers,
    layout: MainLayout,
  },
  {
    path: componentRoutes.adminOrganizations,
    component: AdminOrganization,
    layout: MainLayout,
  },
  {
    path: componentRoutes.adminSubscriptions,
    component: AdminSubscriptions,
    layout: MainLayout,
  },
];

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
  {
    path: componentRoutes.organizationEmployees,
    component: OrganizationEmployees,
    layout: MainLayout,
  },
  {
    path: componentRoutes.organizationCoupons,
    component: OrganizationCoupons,
    layout: MainLayout,
  },
  {
    path: componentRoutes.organizationAccountProfile,
    component: OrganizationAccountProfile,
    layout: MainLayout,
  },
  {
    path: componentRoutes.organizationAccountSubscription,
    component: OrganizationAccountSubscription,
    layout: MainLayout,
  },
];

export const pageRoutes = [
  ...rootRoutes,
  ...adminRoutes,
  ...organizationRoutes,
];
