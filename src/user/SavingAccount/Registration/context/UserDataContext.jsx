// contexts/UserDataContext.js
import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../../../../../axios.utils';
import { useUserSocket } from '../../../context/UserSocketContext';


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
  const [ loginView, setLoginView ] = useState('login');
  const [ signupView, setSignupView ] = useState('signup');
  
  // const navigate = useNavigate();
  // Function to send user data and handle response
  const sendUserData = async (fullname, email, dob, phoneno) => {
    try {
      const response = await axiosInstance.post('/client/classic/Create', {
        "data": {
          "Name": fullname,
          "Mail": email,
          "Birth": dob,
          "Number": phoneno,
          "Password": "0000",
          "Pin": "0000"
        }
      });

      console.log(response);
      // Set userData based on the form data
      sessionStorage.setItem("Number", phoneno )
      // setUserData({ fullname, email, dob, phoneno });
      
      // Handle the rest of the response if necessary
    } catch (error) {
      console.error('Error sending user data:', error);
      throw new Error('Failed to send user data');
    }
  };

  const requestOTP = async () => {
    try {
      const phone = sessionStorage.getItem("Number")
      if (!phone) {
        throw new Error('Phone number is missing');
      }
      console.log(phone);

      const response = await axiosInstance.post('/client/classic/Code', {
        "data": {
          "Number": phone
        }
      });

      console.log(response);
      return response;
    } catch (error) {
      console.error("Error requesting OTP:", error);
    }
  };

  const userLogin = async(phoneno) => {
    try {
      const response = await axiosInstance.post('/client/classic/Code',{
        "data": {
            "Number": phoneno
        }
    });
      // Assuming the response includes a phone number for verification
      console.log(response)
      // setPhoneNumber(phoneno);
      sessionStorage.setItem("Number", phoneno )
      
      // Set userData and verificationStatus based on API response
      // setUserData({ fullname, email, dob, phoneno });
      setVerificationStatus(true); // Proceed to OTP verification
      return response;
      
    } catch (error) {
      console.error('Error sending user data:', error);
      // Handle error (e.g., show error message)
      throw new Error('Failed to send user data');
    }
  }

  

  // Function to send OTP and handle verification
  const sendOTP = async (otp) => {
    try {
      const phone = sessionStorage.getItem("Number")
      const response = await axiosInstance.post('/client/classic/Verify', {
        "data": {
            "Number": phone,
            "Code": otp,
            "Verify": true
        }
    });
      console.log(response);
      // sessionStorage.setItem('accesstoken', response.data.data.accesstoken)
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

  const sendLoginOTP = async (otp) => {
    try {
      const phone = sessionStorage.getItem("Number")
      const response = await axiosInstance.post('/client/classic/Login', {
        "data": {
            "Number": phone,
            "Code": otp
        }
    });
      console.log(response);
      sessionStorage.setItem('role', 'user');
      // sendUserIdentifier(response.data.credentials.Identifier)
      // sessionStorage.setItem('Identifier', response.data.credentials.access)
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
    requestOTP,
    sendOTP,
    sendLoginOTP,
    userLogin,
    loginView,
    setLoginView,
    signupView,
    setSignupView
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
