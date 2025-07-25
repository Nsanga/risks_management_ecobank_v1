import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdControlPoint,
  MdEvent,
  MdHome,
  MdLogout,
  MdOutlineMiscellaneousServices,
  MdSettings,
  MdSettingsSystemDaydream,
} from "react-icons/md";
import { GiPlatform } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { TbReportSearch, TbSettings2 } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
import Integration from "views/admin/integration";
import Configuration from "views/admin/configuration";
import Reports from "views/admin/reports"
import Sytem from "views/admin/system";
import Risks from "views/admin/risks";
import signIn from "views/auth/signIn";
import Logout from "views/admin/Logout";
import { RiSkull2Fill } from "react-icons/ri";
import Event from "views/admin/event";
import Control from "views/admin/control";
import Actions from "views/admin/actions";
import Action from "views/admin/action";
import KeyRiskIndicator from "views/admin/KRI";
import Indicator from "views/admin/kri-search-result";
import SettingsPage from "views/admin/settings";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Events",
    layout: "/admin",
    path: "/events",
    icon: <Icon as={RiSkull2Fill} width='20px' height='20px' color='inherit' />,
    component: Risks,
  },
  {
    name: "RCSA",
    layout: "/admin",
    path: "/control",
    icon: <Icon as={MdControlPoint} width='20px' height='20px' color='inherit' />,
    component: Control,
  },
  {
    name: "KRI",
    layout: "/admin",
    path: "/key-risk-indicator",
    icon: <Icon as={MdControlPoint} width='20px' height='20px' color='inherit' />,
    component: KeyRiskIndicator,
  },
  {
    name: "Actions",
    layout: "/admin",
    path: "/actions",
    icon: <Icon as={MdControlPoint} width='20px' height='20px' color='inherit' />,
    component: Actions,
  },
  {
    name: "Configuration",
    layout: "/admin",
    path: "/settings",
    icon: (
      <Icon as={LuSettings2} width='20px' height='20px' color='inherit'/>
    ),
    component: Configuration,
    secondary: true,
  },
  {
    name: "Reports",
    layout: "/admin",
    icon: <Icon as={TbReportSearch} width='20px' height='20px' color='inherit' />,
    path: "/reports",
    component: Reports,
  },
  {
    name: "System",
    layout: "/admin",
    path: "/system",
    icon: <Icon as={MdSettingsSystemDaydream} width='20px' height='20px' color='inherit' />,
    component: Sytem,
  },
  {
    name: "Integration",
    layout: "/admin",
    path: "/integration",
    icon: <Icon as={TbSettings2} width='20px' height='20px' color='inherit' />,
    component: Integration,
  },
  {
    name: "Event",
    layout: "/admin",
    path: "/event",
    icon: <Icon as={MdManageAccounts} width='20px' height='20px' color='inherit' />,
    component: Event,
  },
  {
    name: "Action",
    layout: "/admin",
    path: "/action",
    icon: <Icon as={MdManageAccounts} width='20px' height='20px' color='inherit' />,
    component: Action,
  },
  {
    name: "KeyIndicator",
    layout: "/admin",
    path: "/kri-search-result",
    icon: <Icon as={MdManageAccounts} width='20px' height='20px' color='inherit' />,
    component: Indicator,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/tenant-settings",
    icon: (
      <Icon
        as={MdSettings}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: SettingsPage,
  },
  // { 
  //   name: "Configuration",
  //   layout: "/admin",
  //   path: "/configuration",
  //   icon: <Icon as={LuSettings2} width='20px' height='20px' color='inherit' />,
  //   component: Configuration,
  // },
  // {
  //   name: "Déconnexion",
  //   layout: "/admin",
  //   path: "/logout",
  //   icon: (
  //     <Icon
  //       as={MdLogout}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: Logout,
  //   secondary: true,
  // },
  {
    name: "Login",
    layout: "/auth",
    path: "/login",
    icon: (
      <Icon
        as={MdEvent}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: signIn,
    secondary: true,
  },
];

export default routes;
