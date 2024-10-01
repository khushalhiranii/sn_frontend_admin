import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isDobValid, setIsDobValid] = useState(false);

  const navigate = useNavigate();

  // Email validation (basic regex for a valid email)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  // Phone number validation (basic length check for 10 digits)
  const validatePhone = (phoneno) => {
    const phoneRegex = /^[0-9]{10}$/;  // Update this if you want to support different phone formats
    setIsPhoneValid(phoneRegex.test(phoneno));
  };

  // Date of Birth validation (must be a valid date and not in the future)
  const validateDob = (dob) => {
    const today = new Date();
    const inputDate = new Date(dob);
    setIsDobValid(inputDate <= today);
  };

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
    <div className="w-full relative bg-white overflow-y-auto flex flex-col items-end justify-start px-[4rem] box-border gap-[1.5rem] leading-[normal] tracking-[normal] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border">
      <main className="self-stretch flex flex-row items-center justify-center gap-[2rem] max-w-full text-left text-[2rem] text-black1 font-roboto lg:flex-wrap mq750:flex-col mq750:gap-[1rem]">
        <div className="h-auto flex-1 relative rounded-3xl bg-whitesmoke box-border max-w-full border-[4px] border-solid border-white lg:flex-1 mq750:min-w-full">
          <img src='login.svg' />
        </div>
        <div className='rounded-3xl box-border flex flex-col justify-between p-[58px] w-full border-[1px] border-solid border-foundation-white-normal-hover px-[4rem] gap-[32px]'>

          <div className="flex flex-row items-center justify-start gap-[1.5rem]">
            <img className="h-[4rem] w-[4rem]" alt="" src="/sn.svg" />
            <div className="relative text-[32px] font-semibold">Registration</div>
          </div>
          {error && <div className="text-red-700 text-sm font-normal">{error}</div>}
          <div className="self-stretch flex flex-col gap-5">
            <InputReg
              label="Full Name"
              id="fullName"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <InputReg
              label="E-mail"
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);  // Validate email
              }}
            />
            {!isEmailValid && email && <div className="text-red-500 text-sm font-normal">Please enter a valid email</div>}
            
            <InputReg
              label="Date of Birth"
              id="dob"
              type="date"
              placeholder="DD-MM-YYYY"
              onChange={(e) => {
                setDob(e.target.value);
                validateDob(e.target.value);  // Validate date of birth
              }}
            />
            {!isDobValid && dob && <div className="text-red-500 text-sm font-normal">Please select a valid date of birth</div>}
            
            <InputReg
              label="Phone No"
              id="phoneno"
              type="tel"
              placeholder="Number"
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value);  // Validate phone number
              }}
            />
            {!isPhoneValid && phoneno && <div className="text-red-500 text-sm font-normal">Please enter a valid phone number (10 digits)</div>}
          </div>

          <div className="self-stretch flex justify-end">
            <RedButton
              label="Get OTP"
              onClick={handleSubmit}
              disabled={
                loading || !name || !isEmailValid || !isPhoneValid || !isDobValid
              }  // Disable if validations fail
              loading={loading}
              className="w-[100%]"
            />
          </div>
          <div className='text-[16px] flex flex-col items-center'>
            Already registered to Subandhan Nidhi? <NavLink to={'/login'}>Login Now</NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};
