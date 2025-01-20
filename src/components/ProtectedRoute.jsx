// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const username = localStorage.getItem('username');
//   const role = localStorage.getItem('role');

//   // If the user is not logged in, redirect to the login page
//   if (!username || !role) {
//     return <Navigate to="/login" />;
//   }

//   // If a specific role is required and the user doesn't have it, redirect to the dashboard
//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to="/dashboard" />;
//   }

//   // If the user is authenticated and has the required role, render the children
//   return children;
// };

// export default ProtectedRoute;

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