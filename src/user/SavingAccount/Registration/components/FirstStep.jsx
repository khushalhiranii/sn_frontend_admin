import React, { useContext, useState, useEffect } from 'react';
import InputReg from '../../../DesignSystem/InputReg';
import RedButton from '../../../DesignSystem/RedButton';
import { multiStepContext } from '../context/StepContext';
import axiosInstance from '../../../../../axios.utils';

function FirstStep() {
  const [states, setStates] = useState([]); // Store the states
  const [cities, setCities] = useState([]); // Store the cities based on selected state
  const [selectedStateCode, setSelectedStateCode] = useState(''); // To track selected state code
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  const { setStep, userData, setUserData } = useContext(multiStepContext);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axiosInstance.get('/client/classic/States');
        console.log(response)
        setStates(response.data); // Assuming `response.data` holds the states array
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedStateCode) {
      const fetchCities = async () => {
        try {
          const response = await axiosInstance.post('/client/classic/Cities', { "state_code": selectedStateCode });
          setCities(response.data); // Assuming `response.data` holds the cities array
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    }
  }, [selectedStateCode]);

  // Check form validity when userData changes
  useEffect(() => {
    if (userData.address1 && userData.address2 && userData.state && userData.city && userData.zip) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [userData]);

  // Handle form submission
  const handleSubmit = () => {
    setStep(2); // Move to the next step
  };

  if (!states) {
    return (<div>Loading..</div>);
  }

  return (
    <div className="h-[744px] w-full flex flex-col gap-[170px]">
      <div className='flex flex-col gap-[32px]'>
        <div className='text-2xl font-bold'>
          Address
        </div>
        <div className='flex flex-col gap-[24px]'>

          {/* Address fields */}
          <InputReg label={"Address Line 1"} type={"text"} placeholder={"Line 1"}
            onChange={(e) => setUserData({ ...userData, address1: e.target.value })}
            value={userData.address1 || ''}
          />
          <InputReg label={"Address Line 2"} type={"text"} placeholder={"Line 2"}
            onChange={(e) => setUserData({ ...userData, address2: e.target.value })}
            value={userData.address2 || ''}
          />

          {/* State Dropdown */}
          <div className='flex flex-col'>
            <label className="min-w-[3.938rem] text-sm font-normal text-black">State</label>
            <select
              onChange={(e) => {
                const selectedStateName = e.target.options[e.target.selectedIndex].text; // Get selected state_name
                const selectedStateCode = e.target.value; // Get selected state_code

                setSelectedStateCode(selectedStateCode); // Set the state code for city fetching
                setUserData({ ...userData, state: selectedStateName }); // Store state_name in userData
              }}
              value={selectedStateCode} // Bind to the selected state code
              className="w-full h-[48px] rounded-lg border text-[17px] font-medium border-solid border-foundation-white-normal-active outline-none focus:outline-none placeholder:text-[17px] placeholder:font-medium placeholder:text-foundation-white-normal-hover placeholder:flex placeholder:flex-col placeholder:items-center box-border"
            >
              <option value="" disabled>Select State</option>
              {states.map((state) => (
                <option key={state.state_code} value={state.state_code}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className='flex flex-col'>
            <label className="min-w-[3.938rem] text-sm font-normal text-black" >City</label>
            <select
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
              value={userData.city || ''}
              disabled={!selectedStateCode} // Disable city selection until a state is selected
              className="w-full h-[48px] rounded-lg border text-[17px] font-medium border-solid border-foundation-white-normal-active outline-none focus:outline-none placeholder:text-[17px] placeholder:font-medium placeholder:text-foundation-white-normal-hover placeholder:flex placeholder:flex-col placeholder:items-center box-border"
            >
              <option value="" disabled>Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Zip Field */}
          <InputReg label={"Zip"} type={"text"} placeholder={"Zip *"}
            onChange={(e) => setUserData({ ...userData, zip: e.target.value })}
            value={userData.zip || ''}
          />
        </div>
      </div>
      <div className="self-stretch flex justify-end">
        <RedButton label={"Next"} onClick={handleSubmit} disabled={!isFormValid} className={`${!isFormValid && 'opacity-50 cursor-not-allowed'} w-full`} />
      </div>
    </div>
  );
}

export default FirstStep;
