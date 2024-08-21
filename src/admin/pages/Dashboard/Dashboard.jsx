import React, { useState } from 'react';
import Loan from './loan';
import Card1 from '../../components/InfoCard';
import Time from '../../assets/time';
import Hr from '../../assets/hr-person';
import Briefcase from '../../assets/briefcase';
import Apartment from '../../assets/apartment';

function Dashboard() {
  // Set the default state to 'Property Loan'
  const [selectedLoanType, setSelectedLoanType] = useState('Property Loan');

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[2rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.937rem] max-w-full shrink-0 mq675:gap-[0.938rem]">
        <div className="w-[17.25rem] flex flex-row items-start justify-start relative shrink-0 text-[0.813rem] font-inter">
          <img
            className="h-[1.5rem] w-[1.5rem] absolute !m-[0] top-[1.188rem] right-[-0.25rem] overflow-hidden shrink-0"
            alt=""
            src="/user-1.svg"
          />
          <div className="flex-1 rounded bg-foundation-red-normal flex flex-col items-start justify-start p-[0.5rem] gap-[0.5rem] z-[1]">
            <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[3.688rem]">
              28/04/24
            </a>
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] text-[1.25rem] font-roboto">
              <div className="flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[7.813rem] mq450:text-[1rem]">
                  Today’s Tasks
                </a>
              </div>
              <div className="h-[1.5rem] w-[1.5rem] relative bg-gainsboro" />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between gap-[2rem] shrink-0 text-black1 mq675:gap-[1rem] mq675:flex-wrap">
          <Loan home22="/loan.svg" loanRequests="Loan Requests" />
          <Loan home22="/schemes.svg" loanRequests="Scheme Request" />
          <Loan home22="/due-loan.svg" loanRequests="Due Loans" />
          <Loan home22="/sav-acc.svg" loanRequests="Saving Account" />
        </div>
      </div>
      <div className="flex flex-col max-w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
              
              <button 
                onClick={() => handleButtonClick('Property Loan')}
                className={`navlink2 ${selectedLoanType === 'Property Loan' ? 'active' : ''}`}
              >
                <Apartment/>
                Property Loan
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Instant Loan')}
                className={`navlink2 ${selectedLoanType === 'Instant Loan' ? 'active' : ''}`}
              >
                <Time/>
                Instant Loan
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Personal Loan')}
                className={`navlink2 ${selectedLoanType === 'Personal Loan' ? 'active' : ''}`}
              >
                <Hr/>
                Personal Loan
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Business Loan')}
                className={`navlink2 ${selectedLoanType === 'Business Loan' ? 'active' : ''}`}
              >
                <Briefcase/>
                Business Loan
              </button>
            </div>
          </div>
          
            {/* {selectedLoanType && ( */}
              <div className="flex flex-row flex-wrap items-start justify-between gap-[16px] px-[16px]">
                {/* {selectedLoanType} Content */}
                <Card1 cardAvatars="/ellipse-245@2x.png" />
                <Card1 cardAvatars="/ellipse-245-1@2x.png" />
                <Card1 cardAvatars="/ellipse-245-1@2x.png" />
                <Card1 cardAvatars="/ellipse-245-2@2x.png" />
                
              </div>
            {/* )} */}
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;