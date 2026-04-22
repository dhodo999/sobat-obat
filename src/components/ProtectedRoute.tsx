import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  // If no token exists, send them back to the login page
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If they have a token, render whatever component was wrapped
  return children;
};

export default ProtectedRoute;
