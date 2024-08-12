// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';

const PrivateRoute2 = ({ component: Component }) => {
   const { userData, otpVerificationStatus }  = useUserData()
//   console.log(isAuthenticated)
    // if((userData && userData === condition)){
    //     return(
    //         <Component/>
    //     )
    // }else{
    //     return <Navigate to="/" replace />
    // }
    

  return (
    otpVerificationStatus ? (
          <Component />
        ) : (
            <Navigate to="/" replace />
        )
  )
}
export default PrivateRoute2;
