import React, { createContext, useState } from 'react';
// import axios from 'axios';

export const multiStepContext = createContext();

const StepContext = ({children}) => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] =useState([]);

    async function submitData() {
        console.log(userData);
        try {
          const response = await axios.post('https://sn-backend.vercel.app/api/v1/user/account', userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem(accessToken)}`
            }
          });
          console.log(response.data); // Assuming you want to log the response data
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      }

  return(
    <div>
        <multiStepContext.Provider value={{currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData}}>
            {children}
        </multiStepContext.Provider>
    </div>
  )
}

export default StepContext;