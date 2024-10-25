import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserData } from '../SavingAccount/Registration/context/UserDataContext';
import InputReg from '../DesignSystem/InputReg';
import RedButton from '../DesignSystem/RedButton';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { userLogin, setLoginView } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous errors
    try {
      const response = await userLogin(phone);
      if (response.status === 200) {
        // navigate('/login/otp');
        setLoginView('otp')
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative bg-white overflow-y-auto flex flex-col items-end justify-start px-[4rem] box-border gap-[1.5rem] leading-[normal] tracking-[normal] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border">
      <main className="self-stretch flex flex-row items-center justify-center gap-[2rem] w-full text-left text-[2rem] text-black1 font-roboto lg:flex-wrap mq750:flex-col mq750:gap-[1rem]">
        <div className="h-auto flex flex-col relative rounded-3xl bg-whitesmoke box-border items-center justify-center max-w-full border-[4px] border-solid border-white lg:flex-1 mq750:min-w-full">
          <img src='registration.svg' />
        </div>
        <div className="rounded-3xl bg-white box-border flex flex-col items-start justify-between p-[4rem] w-full border-[1px] border-solid border-foundation-white-normal-hover lg:flex-1 lg:min-h-[auto] mq750:pl-[1.938rem] mq750:pr-[1.938rem] mq750:box-border mq450:pt-[1.688rem] mq450:pb-[1.688rem] mq450:box-border mq1050:pt-[2.625rem] mq1050:pb-[2.625rem] mq1050:box-border">
          <div className="self-stretch flex flex-col w-full items-start justify-center gap-[36px] mq750:gap-[1rem]">
            <div className="flex flex-row items-center justify-center gap-[1.5rem] mq450:flex-wrap">
              <img
                className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
                loading="lazy"
                alt=""
                src="/sn.svg"
              />
              <h2 className="m-0 relative text-[32px] font-semibold mq450:text-[1.188rem] mq1050:text-[1.625rem]">
                Login
              </h2>
            </div>
            {errorMessage && (
              <div className="text-red-700 text-mid font font-roboto">{errorMessage}</div>
            )}
            <form className="self-stretch flex flex-col items-start justify-start gap-6 md:gap-4">
              <InputReg
                label={"Phone No"}
                value={phone}
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="font-roboto text-sm">
                New to Subandhan Nidhi?{' '}
                <NavLink to={'/register'} className="gap-2">Register Now</NavLink>
              </div>
            </form>
            <div className="w-full">
              <RedButton
                label={loading ? "Loading..." : "Get OTP"}
                onClick={handleSubmit}
                className={`w-full`}
                disabled={!phone || loading}
                loading={loading} // Pass loading state to button
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
