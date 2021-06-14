import React from "react";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import Maps from "../Pages/Manager/Maps";
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
];

export default routes;
