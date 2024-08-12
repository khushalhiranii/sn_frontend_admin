import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RedButton from "../../../DesignSystem/RedButton";

export const OtpVerified = ({ className = "" }) => {
  const navigate = useNavigate();
  return (
    // <div className='h-[896px] flex flex-col w-full'>
	    <div className="h-[896px] flex flex-col w-full flex-grow justify-between gap-[32px] mq750:gap-[1rem]">
	      <div className="flex flex-row items-center justify-start gap-[1.5rem] mq450:flex-wrap">
          <img
            className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
            loading="lazy"
            alt=""
            src="/sn.svg"
            />
          <div className="m-0 relative text-[32px] font-semibold mq450:text-[1.188rem] mq1050:text-[1.625rem]">
            Phone Verification
          </div>
	      </div>
        <div className="self-stretch flex flex-col items-center justify-center gap-4 text-center text-sm text-gray-800">
          <img
            className="w-[120px] h-[120px] rounded-full"
            loading="lazy"
            alt=""
            src="/image 2.png"
          />
          <div className="flex flex-col text-base font-normal items-center justify-center gap-2">
            <p className="m-0">For further benefits</p>
            <p className="m-0">Open Subandhan Nidhi Saving Account</p>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-center gap-4">
          <RedButton label={"Open Saving Account"} onClick={navigate('/register/openAcc')} className="w-full"/>
          <button className="w-full py-[12px] px-[24px] text-base font-medium bg-transparent border border-solid border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none">
            Skip for Now
          </button>
        </div>
      </div>
  );
};

OtpVerified.propTypes = {
  className: PropTypes.string,
};
