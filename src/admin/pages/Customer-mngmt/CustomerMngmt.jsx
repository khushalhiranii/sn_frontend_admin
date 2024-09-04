import React, { useState } from 'react'
import Agmng from '../../assets/ag-mng';
import Time from '../../assets/time';
import Hr from '../../assets/hr-person';
import Briefcase from '../../assets/briefcase';

function CustomerMngmt() {
  const [selectedLoanType, setSelectedLoanType] = useState('Weekly');
  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            {/* Loan type buttons */}
            <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                <button onClick={() => handleButtonClick('Property')} className={`navlink2 ${selectedLoanType === 'Property' ? 'active' : ''}`}>
                  <Agmng /> List of Clients
                </button>
              </div>
              <button onClick={() => handleButtonClick('Instant')} className={`navlink2 ${selectedLoanType === 'Instant' ? 'active' : ''}`}>
                <Time /> Overdue Clients
              </button>
              <button onClick={() => handleButtonClick('Personal')} className={`navlink2 ${selectedLoanType === 'Personal' ? 'active' : ''}`}>
                <Hr /> Loan Applications
              </button>
              <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                <button onClick={() => handleButtonClick('Business')} className={`navlink2 ${selectedLoanType === 'Business' ? 'active' : ''}`}>
                  <Briefcase /> Scheme Applications
                </button>
              </div>
            </div>
          </div>
          {/* Display filtered and merged data */}
          <div className="w-full flex flex-row flex-wrap gap-[16px] items-center justify-between px-[16px] box-border">
            {/* {mergedAccounts.map((account, index) => (
              <LoanCard
                key={index}
                phoneno={account.Number}
                fullname={account.Name}
                address={account.Address}
                profilePicture={account.Photo}
                key1={account.Identifier}
                id={account._id}
                amount={account.Amount}
                {...account}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerMngmt