import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role, allowedRoles }) => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  return token && allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
