import React from "react";
import { Children } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./firebase";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  return currentUser?.token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
