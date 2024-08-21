import React, { useState } from 'react';
import '../App.css';
import { NavLink, Outlet } from 'react-router-dom';
import SavingCard from './saving-card';
import CustomInput from '../../user/DesignSystem/CustomInput';

function Kycprocess() {

  const [selectedLoanType, setSelectedLoanType] = useState('Property Loan');

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  return (
    // <div className='flex-auto w-12'>
    //   <div className="flex flex-col w-76 max-w-full items-start justify-start gap-[2rem] mq675:gap-[1rem]">
    //     <div className="w-[17.25rem] rounded bg-foundation-red-normal flex flex-col items-start justify-start p-[0.5rem] box-border gap-[0.5rem] shrink-0">
    //       <div className="relative font-medium">Saving Account Holders</div>
    //       <div className="self-stretch flex flex-row items-end justify-between gap-[1.25rem] text-[1.25rem] font-roboto">
    //         <div className="flex flex-row items-center justify-start">
    //           <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[2.188rem] mq450:text-[1rem]">
    //             854
    //           </a>
    //         </div>
    //         <div className="flex flex-row items-center justify-center p-[0.25rem]">
    //           <img
    //             className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0"
    //             alt=""
    //             src="/bank-1-1.svg"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] px-[1rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
    //       <div className="w-[52.25rem] flex flex-row flex-wrap items-center justify-center max-w-full [row-gap:20px]">
    //         <div className="h-[3.188rem] flex-1 overflow-hidden flex flex-col items-start justify-start p-[1rem] box-border gap-[0.812rem] min-w-[10.5rem]">
    //           <img
    //             className="w-[1rem] h-[1rem] relative overflow-hidden shrink-0 hidden"
    //             alt=""
    //             src="/bell.svg"
    //           />
    //           <NavLink 
    //             to="completed"
    //             className={({ isActive }) => isActive ? "navlink2 active" : "navlink2"}
    //           >
    //             Approval Request
    //           </NavLink>
    //           {/* <div className="self-stretch h-[0.375rem] relative rounded-[100px] bg-foundation-blue-normal shrink-0" /> */}
    //         </div>
    //         <div className="flex-1 overflow-x-hidden flex flex-row items-start justify-start p-[1rem] box-border gap-[0.5rem] min-w-[10.5rem] text-black">
    //           <img
    //             className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0 hidden"
    //             alt=""
    //             src="/bell.svg"
    //           />
    //           <NavLink 
    //             to="pending"
    //             className={({ isActive }) => isActive ? "navlink2 active" : "navlink2"}
    //           >
    //             Pending KYC Process
    //           </NavLink>
    //         </div>
    //       </div>
    //       <Outlet/>
    //     </div>
    //   </div>
    // </div>

    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
      <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
              
              <button 
                onClick={() => handleButtonClick('Property Loan')}
                className={`navlink2 ${selectedLoanType === 'Property Loan' ? 'active' : ''}`}
              >
                Approval Request
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Instant Loan')}
                className={`navlink2 ${selectedLoanType === 'Instant Loan' ? 'active' : ''}`}
              >
                
                Pending KYC Process
              </button>
            </div>
            <div className='p-[8px]'>
              <CustomInput placeholder="Search" iconSrc="/search.svg" className="p-[14px]" />
            </div>
          </div>
          {/* <div className="flex flex-row flex-wrap w-full items-start justify-between gap-[16px] px-[16px]"> */}
          <div className="w-full flex flex-row items-center justify-between px-[16px] box-border">
            <SavingCard />
            <SavingCard />
            <SavingCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kycprocess;
