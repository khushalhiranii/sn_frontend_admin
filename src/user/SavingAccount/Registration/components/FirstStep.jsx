import React, { useContext, useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../context/StepContext';
import InputReg from '../../../DesignSystem/InputReg';
import RedButton from '../../../DesignSystem/RedButton';

function FirstStep() {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  const { setStep, userData, setUserData } = useContext(multiStepContext);

  // Effect to check form validity whenever userData changes
  useEffect(() => {
    if (userData.address1 && userData.address2 && userData.state && userData.city && userData.zip) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [userData]);

  const handleSubmit = () => {
    setStep(2);
    // You can perform any action with the collected data here
  };

  return (
    <div className="h-[744px] w-full flex flex-col gap-[170px]">
      <div className='flex flex-col gap-[32px]'>
        <div className='text-2xl font-bold'>
          Address
        </div>
        <div className='flex flex-col gap-[24px]' >
          <InputReg label={"Address Line 1"} type={"text"} placeholder={"Line 1"} onChange={(e)=>setUserData({...userData, "address1": e.target.value})} id={userData['address1'] || ''} value={userData['address1'] || ''}/>
          <InputReg label={"Address Line 2"} type={"text"} placeholder={"Line 2"} onChange={(e)=>setUserData({...userData, "address2": e.target.value})} id={userData['address2'] || ''} value={userData['address2'] || ''} />
          <InputReg label={"State"} type={"text"} placeholder={"State *"} onChange={(e)=>setUserData({...userData, "state": e.target.value})} id={userData['state'] || ''} value={userData['state'] || ''} />
          <InputReg label={"City"} type={"text"} placeholder={"City *"} onChange={(e)=>setUserData({...userData, "city": e.target.value})} id={userData['city'] || ''} value={userData['city'] || ''} />
          <InputReg label={"Zip"} type={"text"} placeholder={"Zip *"} onChange={(e)=>setUserData({...userData, "zip": e.target.value})} id={userData['zip'] || ''} value={userData['zip'] || ''} />
        </div>
      </div>
      <div className="self-stretch flex justify-end">
        <RedButton label={"Next"} onClick={handleSubmit} disabled={!isFormValid} className={`${!isFormValid && 'opacity-50 cursor-not-allowed'} w-full`} />
      </div>
    </div>
  );
}

export default FirstStep;
