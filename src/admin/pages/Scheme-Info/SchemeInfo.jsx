import React, { useState } from 'react'
import WeeklyD from '../../assets/WeeklyD';
import MonthlyI from '../../assets/MonthlyI';
import FixedD from '../../assets/FixedD';
import RecurringD from '../../assets/RecurringD';
import Card1 from '../../components/InfoCard';

function SchemeInfo() {
    const [selectedLoanType, setSelectedLoanType] = useState('Property Loan');
  
    const handleButtonClick = (loanType) => {
      setSelectedLoanType(loanType);
    };

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
      <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
              
              <button 
                onClick={() => handleButtonClick('Property Loan')}
                className={`navlink2 ${selectedLoanType === 'Property Loan' ? 'active' : ''}`}
              >
                <WeeklyD/>
                Weekly Deposit
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Instant Loan')}
                className={`navlink2 ${selectedLoanType === 'Instant Loan' ? 'active' : ''}`}
              >
                <MonthlyI/>
                Monthly Income
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Personal Loan')}
                className={`navlink2 ${selectedLoanType === 'Personal Loan' ? 'active' : ''}`}
              >
                <FixedD/>
                Fixed Deposit
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Business Loan')}
                className={`navlink2 ${selectedLoanType === 'Business Loan' ? 'active' : ''}`}
              >
                <RecurringD/>
                Recurring Deposit
              </button>
            </div>
          </div>
          {/* <div className="flex flex-row flex-wrap w-full items-start justify-between gap-[16px] px-[16px]"> */}
          <div className="w-full flex flex-row flex-wrap items-center justify-between px-[16px] gap-[16px] box-border">
          <Card1 cardAvatars="/ellipse-245@2x.png" />
          <Card1 cardAvatars="/ellipse-245-1@2x.png" />
          <Card1 cardAvatars="/ellipse-245-1@2x.png" />
          <Card1 cardAvatars="/ellipse-245-2@2x.png" />
          <Card1 cardAvatars="/ellipse-245@2x.png" />
                <Card1 cardAvatars="/ellipse-245-1@2x.png" />
                <Card1 cardAvatars="/ellipse-245-1@2x.png" />
                <Card1 cardAvatars="/ellipse-245-2@2x.png" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeInfo;