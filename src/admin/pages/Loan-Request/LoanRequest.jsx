import React, { useState } from 'react';
import SavingCard from '../../components/saving-card';
// import Bell from '../../assets/bell';

function LoanRequest() {
  const [selectedLoanType, setSelectedLoanType] = useState('Property Loan');

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  return (
    <div className='flex-auto w-12'>
      <div className="flex flex-col w-76 max-w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] px-[1rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-[72.25rem] flex flex-row flex-wrap items-start justify-between max-w-full [row-gap:20px]">
            <div className="h-[3.188rem] flex-auto overflow-hidden flex flex-col items-start justify-start p-[1rem] box-border gap-[0.812rem] min-w-[10.5rem]">
              <img
                className="w-[1rem] h-[1rem] relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/bell.svg"
              />
              <button
                onClick={() => handleButtonClick('Property Loan')}
                className={`navlink2 ${selectedLoanType === 'Property Loan' ? 'active' : ''}`}
              >
                Property Loan
              </button>
            </div>
            <div className="flex-auto overflow-x-hidden flex flex-row items-start justify-start p-[1rem] box-border gap-[0.5rem] min-w-[10.5rem] text-black">
              <img
                className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/bell.svg"
              />
              <button
                onClick={() => handleButtonClick('Instant Loan')}
                className={`navlink2 ${selectedLoanType === 'Instant Loan' ? 'active' : ''}`}
              >
                Instant Loan
              </button>
            </div>
            <div className="flex-auto overflow-x-hidden flex flex-row items-start justify-start p-[1rem] box-border gap-[0.5rem] min-w-[10.5rem] text-black">
              <img
                className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/bell.svg"
              />
              <button
                onClick={() => handleButtonClick('Personal Loan')}
                className={`navlink2 ${selectedLoanType === 'Personal Loan' ? 'active' : ''}`}
              >
                Personal Loan
              </button>
            </div>
            <div className="flex-auto overflow-x-hidden flex flex-row items-start justify-start p-[1rem] box-border gap-[0.5rem] min-w-[10.5rem] text-black">
              <img
                className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/bell.svg"
              />
              <button
                onClick={() => handleButtonClick('Business Loan')}
                className={`navlink2 ${selectedLoanType === 'Business Loan' ? 'active' : ''}`}
              >
                Business Loan
              </button>
            </div>
          </div>
          <div>
            {selectedLoanType && (
              <div className="overflow-y-visible self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem_1.5rem] min-h-[44.75rem] max-w-full">
                {/* {selectedLoanType} Content */}
                <SavingCard/>
                <SavingCard/>
                <SavingCard/>
                <SavingCard/>
                <SavingCard/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRequest;
