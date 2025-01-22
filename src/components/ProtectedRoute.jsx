// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role'); // Get the user's role from localStorage

  // If the user is not logged in, redirect to the login page
  if (!role) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required and the user doesn't have it, redirect to the dashboard
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, allow access to the requested route
  return children;
};

export default ProtectedRoute;