// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utility/auth";

export const PrivateRoute = ({ children }) => {
  if (
    !isLoggedIn() &&
    (window.location.pathname !== "/dashboard" ||
      window.location.pathname !== "/about")
  ) {
    return <Navigate to="/" />;
  }
  return children;
};
