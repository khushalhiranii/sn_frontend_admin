import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export const Content = ({ className = "" }) => {
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
      navigate('/admin/dashboard');
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
    <form onSubmit={handleSubmit}
      className={`m-0 flex-1 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-white overflow-hidden flex flex-col items-start justify-start pt-[4rem] px-[1.437rem] pb-[4rem] box-border gap-[4.687rem] min-w-[22.688rem] max-w-full mq450:gap-[1.188rem] mq450:min-w-full mq700:gap-[2.313rem] mq925:flex-1 mq925:pt-[2.625rem] mq925:pb-[7.875rem] mq925:box-border ${className}`}
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
      <div className="self-stretch flex flex-row items-start justify-center py-[0rem] pr-[0rem] pl-[0.062rem]">
        <button
          type="submit"
          className="cursor-pointer [border:none] py-[0.625rem] px-[4.937rem] bg-foundation-red-normal rounded flex flex-row items-start justify-start whitespace-nowrap hover:bg-mediumvioletred"
          disabled={isButtonDisabled}
        >
          <span className="[text-decoration:none] relative text-[1.25rem] font-medium font-inter text-white text-left inline-block min-w-[3.625rem]">
            Log in
          </span>
        </button>
      </div>
    </form>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};
