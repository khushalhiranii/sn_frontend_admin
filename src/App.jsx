import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "./admin/context/AuthContext";
import InputReg from "./user/DesignSystem/InputReg";
import axiosInstance from "../axios.utils";

const App = ({ className = "" }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Extract the role from the URL path (e.g., "/admin" or "/agent")
  const role = location.pathname.includes("agent") ? "agent" : "admin";
  const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1); // "Admin" or "Agent"

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true); // Set loading to true when submit is clicked
      setIsButtonDisabled(true);

      const response = await axiosInstance.post(`/${role}/classic/Login`, {
        data: {
          Identifier: userId,
          Password: password,
        },
      });

      sessionStorage.setItem('role', role);
      console.log(response);
      navigate(`/${role}/dashboard`); // Dynamic navigation
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
    setIsButtonDisabled(!(userId && password));
  }, [userId, password]);

  return (
    <div className="w-full relative [background:linear-gradient(116.84deg,_rgba(176,_208,_247,_0.8)_16.44%,_rgba(229,_178,_196,_0.8)_40.44%)] overflow-hidden flex flex-row items-center justify-center box-border leading-[normal] tracking-[normal] min-h-screen">
      <div className="w-[69.75rem] rounded-2xl bg-gainsboro overflow-hidden shrink-0 flex flex-row items-stretch justify-start max-w-full [row-gap:20px] mq925:flex-wrap">
        <div className={`bg-white overflow-hidden h-[550px] flex flex-col justify-between items-stretch py-[3.125rem] px-[4.125rem] box-border w-[50%] text-[2.25rem] text-black font-inter ${className}`}>
          <div className="relative text-4xl text-left font-semibold inline-block min-w-[8.063rem]">
            Join Us
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-[1rem]">
            <div className="w-[22.5rem] flex items-center justify-center py-[0rem] px-[1.25rem] box-border">
              <img className="h-[9.375rem] w-[9.375rem] relative object-cover" loading="lazy" alt="" src="/sn.svg" />
            </div>
            <div className="relative text-center text-[20px] font-medium">Subandhan Nidhi Bank</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className={`m-0 flex-1 rounded-tl-none rounded-tr-xl bg-white flex flex-col items-start justify-between font-inter py-[3.125rem] px-[4.125rem] ${className}`}>
          <div className="flex flex-col items-start justify-start pb-[1rem]">
            <div className="relative text-[2.25rem] font-medium text-black">Hello {roleCapitalized}!</div>
            <div className="text-sm font-medium text-[#666666]">
              {role === "admin" 
                ? "Track volunteer participation, and oversee all activities." 
                : "Manage clients, monitor leads, and drive sales."}
            </div>
          </div>

          {errorMessage && (
            <div className="self-stretch text-red-600 mb-4">{errorMessage}</div>
          )}

          <div className="self-stretch flex flex-col items-start gap-[0.5rem]">
            <InputReg
              className="text-[#666666] text-[18px]"
              label="User ID"
              type="text"
              aria-label="User ID"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <InputReg
              className="text-[#666666] text-[18px]"
              label="Password"
              type="password"
              aria-label="Password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col gap-[12px] items-center py-[1.25rem]">
            <button
              type="submit"
              className={`cursor-pointer py-[0.625rem] px-[4.937rem] bg-foundation-red-normal rounded w-[217px] h-[48px] hover:bg-mediumvioletred ${
                isButtonDisabled && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-solid border-white border-t-transparent rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              ) : (
                <span className="text-[1.25rem] font-medium text-white">Log in</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/${role}/dashboard`)}
              className="text-foundation-red-normal bg-white underline"
            >
              Forgot Password?
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
