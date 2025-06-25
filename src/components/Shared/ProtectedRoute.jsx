// src/components/Shared/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token"); // Replace with real auth logic

  return isAuthenticated ? children : <Navigate to="/login" />;
}
