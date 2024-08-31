import React, { createContext, useState } from 'react';
import axiosInstance from '../../../../../axios.utils';
// import axios from 'axios';

export const multiStepContext = createContext();

const StepContext = ({children}) => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] =useState([]);

    async function submitData() {
        console.log(userData);
        try {
          const response = await axiosInstance.post('/client/classic/Datas', {
            "data" : {
              "Identifier" : sessionStorage.getItem('Identifier'),
              "Keys" : ["Aadhar_Number","Pan_Number","Salary","Employment","Address"],
              "Values" : [
                  userData.aadharNo,
                  userData.panNo,
                  userData.income,
                  userData.emp_type,
                  {
                      "Address" : {
                          "1" : userData.address1,
                          "2" : userData.address2
                      },
                      "City" : userData.city,
                      "Zip" : userData.zip,
                      "State" : userData.state
                  }
                ]
              }
            }
          );
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