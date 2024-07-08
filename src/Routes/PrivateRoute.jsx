// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { checkAuthStatus, isAuthenticated } = useAuth();
  // checkAuthStatus();
  console.log(isAuthenticated)

  return (
        sessionStorage.getItem('accessToken') ? (
          <Component />
        ) : (
          <Navigate to="/admin" replace />
        )
  )
}
export default PrivateRoute;
