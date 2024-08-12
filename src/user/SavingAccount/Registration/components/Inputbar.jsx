import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import InputReg from '../../../DesignSystem/InputReg';
import RedButton from '../../../DesignSystem/RedButton';

export const Inputbar = () => {
  const { sendUserData } = useUserData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call sendUserData function from context
      await sendUserData(name, email, dob, phone);
      navigate('/otp'); // Proceed to OTP verification step
    } catch (error) {
      console.error('Failed to send user data:', error.message);
      setError('User already exists');
    }
  };

  return (
    <div className='h-[896px] flex flex-col w-full'>
      <div className="flex flex-col w-full items-start justify-start flex-grow gap-[2rem] mq750:gap-[1rem]">
        <div className="flex flex-row items-center justify-center gap-[1.5rem] mq450:flex-wrap">
          <img
            className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
            loading="lazy"
            alt=""
            src="/sn.svg"
          />
          <div className="m-0 relative text-[32px] font-semibold mq450:text-[1.188rem] mq1050:text-[1.625rem]">
            Registration
          </div>
        </div>
        {error && <div className="text-red-700 text-mid">{error}</div>}
        <div className="self-stretch flex flex-col items-start justify-start gap-6 md:gap-4">
          <InputReg label={"Full Name"} id={"fullName"} type={"text"} placeholder={"Name"} onChange={(e) => setName(e.target.value)} />
          <InputReg label={"E-mail"} id={"email"} type={"email"} placeholder={"E-mail"} onChange={(e) => setEmail(e.target.value)} />
          <InputReg label={"Date of Birth"} id={"dob"} type={"date"} placeholder={"DD-MM-YYYY"} onChange={(e) => setDob(e.target.value)} />
          <InputReg label={"Phone No"} id={"phone"} type={"tel"} placeholder={"Number"} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="self-stretch flex justify-end">
        <RedButton label={"Get OTP"} onClick={handleSubmit} className={'w-[100%]'} />
      </div>
    </div>
  );
};
