import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";

const App = ({ className = "" }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { userId, password };

    try {
      setIsButtonDisabled(true);
      const url = `${import.meta.env.VITE_API_URL}/admin/login`;
      const response = await axios.post(url, credentials);
      console.log(response.data.data.accessToken);

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      login(response.data.data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Invalid credentials. Please try again.');
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    // Enable the button when the user inputs change
    if (userId && password) {
      setIsButtonDisabled(false);
    }
  }, [userId, password]);

  return (
    <div className="w-full relative [background:linear-gradient(116.84deg,_rgba(176,_208,_247,_0.8)_16.44%,_rgba(229,_178,_196,_0.8)_40.44%)] overflow-hidden flex flex-row items-center justify-center py-[8.562rem] px-[1.25rem] box-border leading-[normal] tracking-[normal] min-h-screen">
      <div className="w-[69.75rem] rounded-2xl bg-gainsboro overflow-hidden shrink-0 flex flex-row items-stretch justify-start max-w-full [row-gap:20px] mq925:flex-wrap">
        <div
          className={`flex-[0.832] rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl bg-white overflow-hidden flex flex-col items-center justify-between pt-[3.125rem] px-[4.125rem] pb-[2rem] box-border min-w-[22.688rem] max-w-full text-left text-[2.25rem] text-black font-inter mq450:gap-[1.5rem] mq450:min-w-full mq700:gap-[2.938rem] mq700:pl-[2.063rem] mq700:pr-[2.063rem] mq700:box-border mq925:flex-1 mq925:pt-[2.688rem] mq925:pb-[6.75rem] mq925:box-border ${className}`}
        >
          <div className="relative font-semibold inline-block min-w-[8.063rem] mq450:text-[1.375rem] mq925:text-[1.813rem]">
            Join Us
          </div>
          <div className="self-stretch flex flex-row items-center justify-center py-[0rem] pr-[0.187rem] pl-[2.062rem] box-border max-w-full">
            <div className="flex-1 flex flex-col items-center justify-center gap-[2.5rem] max-w-full mq450:gap-[1.25rem]">
              <div className="w-[22.5rem] flex flex-row items-center justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
                <img
                  className="h-[9.375rem] w-[9.375rem] relative object-cover"
                  loading="lazy"
                  alt=""
                  src="/sn.png"
                />
              </div>
              <div className="relative font-medium mq450:text-[1.375rem] mq925:text-[1.813rem]">
                Subandhan Nidhi Bank
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center py-[1rem] justify-center">
            <button className="cursor-pointer [border:none] py-[0.25rem] px-[0.75rem] bg-royalblue rounded flex flex-row items-center justify-center gap-[0.25rem]">
              <div className="flex flex-row items-center justify-center py-[0.625rem] px-[0.5rem]">
                <div className="relative text-[1.25rem] font-medium font-roboto text-whitesmoke text-left inline-block min-w-[7.5rem] mq450:text-[1rem]">
                  Register Now
                </div>
              </div>
              <div className="flex flex-col items-center justify-center pt-[0.593rem] px-[0rem] pb-[0rem]">
                <img
                  className="w-[1.5rem] h-[1.5rem] relative overflow-hidden shrink-0"
                  alt=""
                  src="/arrowright.svg"
                />
              </div>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}
          className={`m-0 flex-1 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-white overflow-hidden flex flex-col items-center justify-between pt-[3rem] px-[1.437rem] pb-[2rem] box-border min-w-[22.688rem] max-w-full mq450:gap-[1.188rem] mq450:min-w-full mq700:gap-[2.313rem] mq925:flex-1 mq925:pt-[2.625rem] mq925:pb-[7.875rem] mq925:box-border ${className}`}
        >
          <div className="flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[1rem]">
            <div className="relative text-[2.25rem] font-medium font-inter text-black text-left inline-block min-w-[6.188rem] mq450:text-[1.375rem] mq925:text-[1.813rem]">
              Hello!
            </div>
          </div>
          {errorMessage && (
            <div className="self-stretch flex flex-row items-center justify-center text-red-600 mb-4">
              {errorMessage}
            </div>
          )}
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem]">
            <div className="relative text-[1.25rem] font-inter text-black text-left inline-block min-w-[4.25rem] mq450:text-[1rem]">
              User ID
            </div>
            <input
              className="[outline:none] bg-[transparent] self-stretch h-[3.063rem] box-border min-w-[15.625rem] border-[1px] border-solid border-gray"
              type="text"
              aria-label="User ID"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <div className="relative text-[1.25rem] font-inter text-black text-left inline-block min-w-[5.813rem] mq450:text-[1rem]">
              Password
            </div>
            <input
              className="[outline:none] bg-[transparent] self-stretch h-[3.063rem] box-border min-w-[15.625rem] border-[1px] border-solid border-gray"
              type="password"
              aria-label="Password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="self-stretch flex flex-row items-center justify-center py-[0rem] pr-[0rem] pl-[0.062rem]">
            <button
              type="submit"
              className="cursor-pointer [border:none] py-[0.625rem] px-[4.937rem] bg-foundation-red-normal rounded flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred"
              disabled={isButtonDisabled}
            >
              <span className="[text-decoration:none] relative text-[1.25rem] font-medium font-inter text-white text-left inline-block min-w-[3.625rem]">
                Log in
              </span>
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