// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utility/auth";

export const PrivateRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" />;
  }
  return children;
};
