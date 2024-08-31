import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserData } from '../SavingAccount/Registration/context/UserDataContext';
import InputReg from '../DesignSystem/InputReg';
import RedButton from '../DesignSystem/RedButton';


export const Login = ()=> {

  const [phone, setPhone] = useState('');
  const navigate = useNavigate()
  const { userLogin } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call sendUserData function from context
      const phoneNumber = await userLogin(phone);
      // console.log('Received phone number:', phoneNumber);
      navigate('/login/otp')
      // Proceed to OTP verification step
      // Implement your logic here (e.g., navigate to OTP verification screen)
    } catch (error) {
      console.error('Failed to send user data:', error);
      // Handle error (e.g., show error message to user)
    //   setError("User already exists")
    }
  };

  return (
        <div className="self-stretch flex flex-col items-start justify-center gap-[2rem] mq750:gap-[1rem]">
            <div className="flex flex-row items-center justify-center gap-[1.5rem] mq450:flex-wrap">
              <img
                className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
                loading="lazy"
                alt=""
                src="/sn.png"
              />
              <h2 className="m-0 relative font-semibold font-roboto mq450:text-[1.188rem] mq1050:text-[1.625rem]">
                Welcome to Subandhan Nidhi
              </h2>
            </div>
            <div className='text-red-700 text-mid font font-roboto' ></div>
                <form className="self-stretch flex flex-col items-start justify-start gap-6 md:gap-4">
                    <InputReg label={"Phone No"} value={phone} id="phone" type="tel" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
                    <div className='font-roboto text-sm'>
                        New to Subandhan Nidhi? 
                        <NavLink to={'/register'} className='gap-2'>Register Now</NavLink>
                    </div>
                </form>
            <div className="pt-32 w-full">
                <RedButton label={"Get OTP"} onClick={handleSubmit} className={`w-full ${!phone && 'opacity-50 cursor-not-allowed'} disabled={!isFormValid}`} />
            </div>
        </div>

  )
}
