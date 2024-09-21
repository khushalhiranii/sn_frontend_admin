// PvtRtUserLogin.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { useUserSocket } from '../../../context/UserSocketContext';

const PvtRtUserLogin = ({ component: Component }) => {
  const { account } = useUserSocket()
  const accountArray = Array.isArray(account) ? account : Object.values(account);
  console.log(accountArray)

  return (
    accountArray?.Status != "Pending" && account?.Status === "Verified" ? (
      <Component />
    ) : (
      <Navigate to="/register/openAcc" replace />
    )
  );
}

export default PvtRtUserLogin;
