import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;