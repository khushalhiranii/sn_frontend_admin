// PvtRtUserLogin.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';

const PvtRtUserLogin = ({ component: Component }) => {
  const { userData } = useUserData();

  return (
    userData ? (
      <Component />
    ) : (
      <Navigate to="/login" replace />
    )
  );
}

export default PvtRtUserLogin;
