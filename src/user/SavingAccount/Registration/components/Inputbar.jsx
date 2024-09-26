import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import InputReg from '../../../DesignSystem/InputReg';
import RedButton from '../../../DesignSystem/RedButton';

export const Inputbar = () => {
  const { sendUserData, requestOTP } = useUserData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phoneno, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendUserData(name, email, dob, phoneno);
      requestOTP();
      navigate('/register/otp');
    } catch (error) {
      setError('User already exists');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[896px] flex flex-col justify-between w-full'>
      <div className="flex flex-col w-full gap-[2rem]">
        <div className="flex flex-row items-center justify-start gap-[1.5rem]">
          <img className="h-[4rem] w-[4rem]" alt="" src="/sn.svg" />
          <div className="relative text-[32px] font-semibold">Registration</div>
        </div>
        {error && <div className="text-red-700">{error}</div>}
        <div className="self-stretch flex flex-col gap-6">
          <InputReg label="Full Name" id="fullName" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <InputReg label="E-mail" id="email" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
          <InputReg label="Date of Birth" id="dob" type="date" placeholder="DD-MM-YYYY" onChange={(e) => setDob(e.target.value)} />
          <InputReg label="Phone No" id="phoneno" type="tel" placeholder="Number" onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="self-stretch flex justify-end">
        <RedButton label="Get OTP" onClick={handleSubmit} disabled={loading || !name || !email || !dob || !phoneno } loading={loading} className="w-[100%]" />
      </div>
    </div>
  );
};
