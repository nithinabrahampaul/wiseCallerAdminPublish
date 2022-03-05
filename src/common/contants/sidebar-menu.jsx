import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { faFileCode, faStickyNote } from "@fortawesome/free-regular-svg-icons";
import {
  faBarcode,
  faBuilding,
  faChartBar,
  faRocket,
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
