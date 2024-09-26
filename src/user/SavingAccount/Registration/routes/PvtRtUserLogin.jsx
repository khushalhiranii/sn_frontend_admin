import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserSocket } from '../../../context/UserSocketContext';

const PvtRtUserLogin = ({ component: Component }) => {
  const { account } = useUserSocket();
  
  // Safely convert the account object into an array or initialize as an empty array if account is null/undefined
  const accountArray = account && typeof account === 'object' ? Object.values(account) : [];
  
  console.log(accountArray);

  // Extract the first account (assuming there's one account in the array)
  const accountStatus = accountArray.length > 0 ? accountArray[0]?.Status : null;

  return (
    accountStatus !== "Pending" && accountStatus === "Verified" ? (
      <Component />
    ) : (
      <Navigate to="/register/openAcc" replace />
    )
  );
}

export default PvtRtUserLogin;
