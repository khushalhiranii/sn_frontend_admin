import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RedButton from "../../../DesignSystem/RedButton";

export const AccountApplied = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full relative bg-white overflow-y-auto flex flex-col items-end justify-start px-[4rem] box-border gap-[1.5rem] leading-[normal] tracking-[normal] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border">
      <main className="self-stretch flex flex-row items-center justify-center gap-[2rem] max-w-full text-left text-[2rem] text-black1 font-roboto lg:flex-wrap mq750:flex-col mq750:gap-[1rem]">
        <div className="h-auto flex-1 relative rounded-3xl bg-whitesmoke box-border max-w-full border-[4px] border-solid border-white lg:flex-1 mq750:min-w-full">
          <img src='/login.svg' />
        </div>
        <div className='rounded-3xl box-border flex flex-col justify-between p-[58px] w-full border-[1px] border-solid border-foundation-white-normal-hover px-[4rem] gap-[32px]'>
            
            <div className="flex flex-row items-center justify-start gap-[1.5rem] mq450:flex-wrap">
                <img
                className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
                loading="lazy"
                alt=""
                src="/sn.svg"
                />
                <div className="m-0 relative text-[32px] font-semibold mq450:text-[1.188rem] mq1050:text-[1.625rem]">
                    Open Saving Account
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
                <p className="m-0">Your Document has been</p>
                <p className="m-0">Submitted Successfully</p>
                </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-center gap-4">
                <RedButton
                label={"Start Exploring Our Products"}
                onClick={() => navigate('/')} // Wrap in an anonymous function
                className="w-full"
                />
                
            </div>
            
        </div>
      </main>
    </div>
  );
};

AccountApplied.propTypes = {
  className: PropTypes.string,
};
