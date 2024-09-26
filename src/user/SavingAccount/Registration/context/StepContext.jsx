import React, { createContext, useState } from 'react';
import axiosInstance from '../../../../../axios.utils';

export const multiStepContext = createContext();

const StepContext = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState({
    aadharNo: '',
    panNo: '',
    income: '',
    emp_type: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: ''
  });
  const [finalData, setFinalData] = useState([]);
  
  async function submitData() {
    console.log(userData);
    try {
      // First API request to submit user data
      const response = await axiosInstance.put('/client/classic/Datas', {
        data: {
          Identifier: sessionStorage.getItem('Identifier'),
          Keys: ["Aadhar_Number", "Pan_Number", "Salary", "Employment", "Address"],
          Values: [
            userData.aadharNo,
            userData.panNo,
            userData.income,
            userData.emp_type,
            {
              Address: {
                "1": userData.address1,
                "2": userData.address2
              },
              City: userData.city,
              Zip: userData.zip,
              State: userData.state
            }
          ]
        }
      });

      console.log('First API response:', response.data); // Log response data for debugging

      // If the first API request succeeds, make the second API call
      if (response) {
        const res = await axiosInstance.post('/client/classic/Request', {
          data: {
            Identifier: sessionStorage.getItem('Identifier')
          }
        });
        console.log('Second API response:', res.data);
        return res;
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  return (
    <multiStepContext.Provider
      value={{
        currentStep,
        setStep,
        userData,
        setUserData,
        finalData,
        setFinalData,
        submitData
      }}
    >
      {children}
    </multiStepContext.Provider>
  );
};

export default StepContext;
