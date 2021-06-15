import React from "react";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import Maps from "../Pages/Manager/Maps";
import QuickUtils from "../Pages/Manager/QuickUtils";
import Console from "../Pages/Manager/Console";
import Login from "../Pages/Login";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/manager",
    component: Console,
    isPrivate: true,
  },
  {
    path: "/console",
    component: Console,
    isPrivate: true,
  },
  {
    path: "/maps",
    component: Maps,
    isPrivate: true,
  },
  {
    path: "/quick-utils",
    component: QuickUtils,
    isPrivate: true,
  },
];

export default routes;
