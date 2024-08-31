import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    sessionStorage.getItem('access') ? (
      children
    ) : (
      <Navigate to="/admin" replace />
    )
  );
}

export default PrivateRoute;
