import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./admin/context/AuthContext";
import InputReg from "./user/DesignSystem/InputReg";
import RedButton from "./user/DesignSystem/RedButton";
import axiosInstance from "../axios.utils";

const App = ({ className = "" }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { userId, password };

    try {
      setIsLoading(true); // Set loading to true when submit is clicked
      setIsButtonDisabled(true);
      const url = `${import.meta.env.VITE_API_URL}/admin/classic/Login`;
      const response = await axiosInstance.post('/admin/classic/Login', {
        "data": {
          "Identifier": userId,
          "Password": password
        }
      });
      
      sessionStorage.setItem('role', 'admin');
      console.log(response);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false); // Stop the spinner when response is received
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    // Disable the button if either userId or password is empty
    if (userId && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [userId, password]);

  return (
    <div className="w-full relative [background:linear-gradient(116.84deg,_rgba(176,_208,_247,_0.8)_16.44%,_rgba(229,_178,_196,_0.8)_40.44%)] overflow-hidden flex flex-row items-center justify-center box-border leading-[normal] tracking-[normal] min-h-screen">
      <div className="w-[69.75rem] rounded-2xl bg-gainsboro overflow-hidden shrink-0 flex flex-row items-stretch justify-start max-w-full [row-gap:20px] mq925:flex-wrap">
        <div className={`bg-white overflow-hidden h-[550px] flex flex-col justify-between items-stretch py-[3.125rem] px-[4.125rem]  box-border w-[50%] text-[2.25rem] text-black font-inter mq450:gap-[1.5rem] mq450:min-w-full mq700:gap-[2.938rem] mq700:pl-[2.063rem] mq700:pr-[2.063rem] mq700:box-border mq925:flex-1 mq925:pt-[2.688rem] mq925:pb-[6.75rem] mq925:box-border ${className}`}
        >
          <div className="relative text-4xl text-left font-semibold inline-block min-w-[8.063rem] mq450:text-[1.375rem] mq925:text-[1.813rem]">
            Join Us
          </div>
          <div className="self-stretch flex flex-row items-center justify-center py-[0rem] box-border max-w-full">
            <div className="flex-1 flex flex-col items-center justify-center gap-[1rem] max-w-full mq450:gap-[1.25rem]">
              <div className="w-[22.5rem] flex items-center justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
                <img
                  className="h-[9.375rem] w-[9.375rem] relative object-cover"
                  loading="lazy"
                  alt=""
                  src="/sn.svg"
                />
              </div>
              <div className="relative text-center text-[20px] font-medium mq450:text-[1.375rem] mq925:text-[1.813rem]">
                Subandhan Nidhi Bank
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center py-[1rem] justify-center">
            <button className="cursor-pointer rounded-[4px] [border:none] py-[0.25rem] px-[0.75rem] bg-[#0166E4] text-[#F5F5F5] flex flex-row items-center justify-center gap-[0.25rem]">
              <div className="flex flex-row items-center justify-center py-[0.625rem] px-[0.5rem]">
                <div className="relative text-[1.25rem] font-medium font-roboto text-left inline-block min-w-[7.5rem] mq450:text-[1rem]">
                  Register Now
                </div>
              </div>
              <div className="flex items-center justify-center h-full w-full">
                <img
                  className="w-[1.5rem] h-[1.5rem]"
                  alt=""
                  src="/arrow-right.svg"
                />
              </div>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}
          className={`m-0 flex-1 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-white overflow-hidden flex flex-col items-start justify-between font-inter py-[3.125rem] px-[4.125rem] box-border min-w-[22.688rem] max-w-full mq450:gap-[1.188rem] mq450:min-w-full mq700:gap-[2.313rem] mq925:flex-1 mq925:pt-[2.625rem] mq925:pb-[7.875rem] mq925:box-border ${className}`}
        >
          <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1rem]">
            <div className="relative text-[2.25rem] font-medium text-black text-left inline-block min-w-[6.188rem] mq450:text-[1.375rem] mq925:text-[1.813rem]">
              Hello Admin!
            </div>
            <div className="text-sm font-medium text-[#666666]">Track volunteer participation, and oversee all activities.</div>
          </div>
          {errorMessage && (
            <div className="self-stretch flex flex-row items-center justify-center text-red-600 mb-4">
              {errorMessage}
            </div>
          )}
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] font-inter">
            <InputReg
              className="text-[#666666] text-[18px]"
              label={"User id"}
              type={"text"}
              aria-label={"User ID"}
              placeholder={"Enter your User ID"}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}  />
            <InputReg
            className="text-[#666666] text-[18px]"
            label={"Password"}
            type="password"
            aria-label="Password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="self-stretch flex flex-row items-center justify-center py-[1.25rem] pr-[0rem] pl-[0.062rem]">
            <button
              type="submit"
              className={`cursor-pointer [border:none] py-[0.625rem] px-[4.937rem] bg-foundation-red-normal rounded flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred ${isButtonDisabled && 'opacity-50 cursor-not-allowed'}`}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <span className="[text-decoration:none] relative text-[1.25rem] font-medium font-inter text-white text-left inline-block min-w-[3.625rem]">
                  Log in
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

App.propTypes = {
  className: PropTypes.string,
};

export default App;
