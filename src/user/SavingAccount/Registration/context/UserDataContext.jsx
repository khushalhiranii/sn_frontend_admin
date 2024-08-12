// contexts/UserDataContext.js
import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Create context
const UserDataContext = createContext();

// Custom hook to use context
export const useUserData = () => {
  return useContext(UserDataContext);
};

// Context Provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ phoneNumber, setPhoneNumber] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [otpVerificationStatus, setOtpVerificationStatus] = useState(false);
  // const navigate = useNavigate();
  // Function to send user data and handle response
  const sendUserData = async (fullname, email, dob, phoneno) => {
    try {
      const response = await axios.post('https://sn-backend.vercel.app/api/v1/user/register',{
        
        fullname,
        email,
        dob,
        phoneno,
        
      });
      // Assuming the response includes a phone number for verification
      setPhoneNumber(response.data.data);
      setUserId(response.data.data.userId);
      // Set userData and verificationStatus based on API response
      setUserData({ fullname, email, dob, phoneno });
      setVerificationStatus(true); // Proceed to OTP verification
      console.log(response.data.data.userId)
      
    } catch (error) {
      console.error('Error sending user data:', error);
      // Handle error (e.g., show error message)
      throw new Error('Failed to send user data');
    }
  };

  const userLogin = async(phoneno) => {
    try {
      const response = await axios.post('https://sn-backend.vercel.app/api/v1/user/login',{
        phoneno
      });
      // Assuming the response includes a phone number for verification
      // setPhoneNumber(response.data.data);
      setUserId(response.data.data.userId);
      console.log(response)
      // Set userData and verificationStatus based on API response
      // setUserData({ fullname, email, dob, phoneno });
      setVerificationStatus(true); // Proceed to OTP verification
      console.log(response.data.data.userId)
      
    } catch (error) {
      console.error('Error sending user data:', error);
      // Handle error (e.g., show error message)
      throw new Error('Failed to send user data');
    }
  }

  // Function to send OTP and handle verification
  const sendOTP = async (otp) => {
    try {
      const response = await axios.post('https://sn-backend.vercel.app/api/v1/user/verifyotp', {
        otp,
        userId
      });
      console.log(response);
      sessionStorage.setItem('accesstoken', response.data.data.accesstoken)
      setOtpVerificationStatus(true);
      return response;
      // if(response.data.accesstoken){
      //   setOtpVerificationStatus(true); // OTP verification successful
      //   // navigate('/otpverified')
      //   return response.data.accesstoken
      // };
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle error (e.g., show error message)
      throw new Error('Failed to verify OTP');
    }
  };

  // Value object to be provided by the context
  const value = {
    userData,
    verificationStatus,
    otpVerificationStatus,
    sendUserData,
    sendOTP,
    userLogin
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
