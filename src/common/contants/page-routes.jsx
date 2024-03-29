import { componentRoutes } from ".";
import Pages from "../../pages";
import Login from "../../pages/auth/login";
import { MainLayout } from "../../pages/layouts/main-layout";
import { BlankLayout } from "../../pages/layouts/blank-layout";
import Register from "../../pages/auth/register";
import OrganizationDashboard from "../../pages/organization/dashboard";
import OrganizationPricing from "../../pages/organization/pricing";
import OrganizationEmployees from "../../pages/organization/reports/employees";
import OrganizationCoupons from "../../pages/organization/reports/coupons";
import AdminDashboard from "../../pages/admin/dashboard";
import AdminUsers from "../../pages/admin/users";
import AdminOrganization from "../../pages/admin/organizations";
import AdminSubscriptions from "../../pages/admin/subscriptions";
import AdminNotes from "../../pages/admin/notes";
import AdminStatus from "../../pages/admin/status";
import AdminCoupon from "../../pages/admin/coupon";
import OrganizationAccountProfile from "../../pages/organization/accout/profile";
import OrganizationAccountSubscription from "../../pages/organization/accout/subscription";
import AdminStaticPages from "../../pages/admin/static-pages";
import { AdminGlobalTypes } from "../../pages/admin/global-types";
import AdminPlans from "../../pages/admin/plan";
import AdminTemplates from "../../pages/admin/templates";
import OrganizationPayment from "../../pages/admin/organization-payment";
import TokenExpired from "../../pages/token-expired";
import AdminAccountProfile from "../../pages/admin/accout/profile";
import DynamicPage from "../../pages/dynamic-page";
import OrganizationTemplates from "../../pages/organization/reports/templates";
import AdminSubStatus from "../../pages/admin/sub-status"

export const rootRoutes = [
  {
    path: componentRoutes.root,
    component: Pages,
    layout: BlankLayout,
    auth: true,
  },
  {
    path: componentRoutes.login,
    component: Login,
    layout: BlankLayout,
    auth: false,
  },
  {
    path: componentRoutes.register,
    component: Register,
    layout: BlankLayout,
    auth: false,
  },
  {
    path: componentRoutes.pricing,
    component: OrganizationPricing,
    layout: BlankLayout,
    auth: false,
  },
  {
    path: componentRoutes.organizationPayment,
    component: OrganizationPayment,
    layout: BlankLayout,
    auth: false,
  },
  {
    path: componentRoutes.tokenExpired,
    component: TokenExpired,
    layout: BlankLayout,
    auth: false,
  },
  {
    path: componentRoutes.dynamicPage,
    component: DynamicPage,
    layout: BlankLayout,
    auth: false,
  },
];

export const adminRoutes = [
  {
    path: componentRoutes.adminDashboard,
    component: AdminDashboard,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminUsers,
    component: AdminUsers,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminOrganizations,
    component: AdminOrganization,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminSubscriptions,
    component: AdminSubscriptions,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminNotes,
    component: AdminNotes,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminStatus,
    component: AdminStatus,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminCoupon,
    component: AdminCoupon,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminPages,
    component: AdminStaticPages,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminGlobalTypes,
    component: AdminGlobalTypes,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminPlans,
    component: AdminPlans,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminTemplates,
    component: AdminTemplates,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminAccountProfile,
    component: AdminAccountProfile,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.adminSubStatus,
    component: AdminSubStatus,
    layout: MainLayout,
    auth: true,
  },
];

export const organizationRoutes = [
  {
    path: componentRoutes.organizationDashboard,
    component: OrganizationDashboard,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.organizationEmployees,
    component: OrganizationEmployees,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.organizationCoupons,
    component: OrganizationCoupons,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.organizationAccountProfile,
    component: OrganizationAccountProfile,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.organizationAccountSubscription,
    component: OrganizationAccountSubscription,
    layout: MainLayout,
    auth: true,
  },
  {
    path: componentRoutes.organizationTemplates,
    component: OrganizationTemplates,
    layout: MainLayout,
    auth: true,
  },
];

export const pageRoutes = [
  ...rootRoutes,
  ...adminRoutes,
  ...organizationRoutes,
];
