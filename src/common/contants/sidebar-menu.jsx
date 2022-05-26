import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { faFileCode, faStickyNote } from "@fortawesome/free-regular-svg-icons";
import {
  faBarcode,
  faBuilding,
  faChartBar,
  faGlobe,
  faRocket,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { componentRoutes } from "./";

export const organizationMenu = [
  {
    title: "Dashboard",
    link: componentRoutes.organizationDashboard,
    icon: faChartBar,
  },
  {
    title: "Employees",
    link: componentRoutes.organizationEmployees,
    icon: faUsers,
  },
  {
    title: "Subscription",
    link: componentRoutes.organizationAccountSubscription,
    icon: faRocket,
  },
  {
    title: "Coupon Code",
    link: componentRoutes.organizationCoupons,
    icon: faBarcode,
  },
];

export const adminMenu = [
  {
    title: "Dashboard",
    link: componentRoutes.adminDashboard,
    icon: faChartBar,
  },
  {
    title: "Users",
    link: componentRoutes.adminUsers,
    icon: faUsers,
  },
  {
    title: "Organization",
    link: componentRoutes.adminOrganizations,
    icon: faBuilding,
  },
  {
    title: "Subscriptions",
    link: componentRoutes.adminSubscriptions,
    icon: faRocket,
  },
  {
    title: "Plans",
    link: componentRoutes.adminPlans,
    icon: faTasks,
  },
  {
    title: "Coupon",
    link: componentRoutes.adminCoupon,
    icon: faBarcode,
  },
  {
    title: "Global Type",
    link: componentRoutes.adminGlobalTypes,
    icon: faGlobe,
  },
  {
    title: "Status",
    link: componentRoutes.adminStatus,
    icon: faPhoenixSquadron,
  },
  {
    title: "Notes",
    link: componentRoutes.adminNotes,
    icon: faStickyNote,
  },
  {
    title: "Pages",
    link: componentRoutes.adminPages,
    icon: faFileCode,
  },
];
