import React from "react";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Home,
    isPrivate: false,
  },
  {
    path: "/*",
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
