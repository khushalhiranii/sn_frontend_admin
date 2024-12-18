// SchemeRequest.js
import React, { useMemo } from 'react';
import WeeklyD from '../../assets/WeeklyD';
import MonthlyI from '../../assets/MonthlyI';
import FixedD from '../../assets/FixedD';
import RecurringD from '../../assets/RecurringD';
import SchemeCard from '../../components/SchemeCard';
import { useSchemeContext } from './SchemeContext'; 
import { useAdminSocket } from '../../context/AdminSocketContext';

function SchemeRequest() {
  const { mergedAccounts, selectedLoanType, setSelectedLoanType } = useSchemeContext();
  const { schemes } = useAdminSocket();

  const filteredSchemes = Object.values(schemes).filter(
    (scheme) => scheme.Status === 'Pending'
  );

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };
  console.log(filteredSchemes)

  const schemeCounts = useMemo(() => {
    const counts = { Weekly: 0, Monthly: 0, Fixed: 0, Recurring: 0 };
    
    filteredSchemes.forEach((scheme) => {
        if (scheme.Type === 'Weekly') counts.Weekly++;
        if (scheme.Type === 'Monthly') counts.Monthly++;
        if (scheme.Type === 'Fixed') counts.Fixed++;
        if (scheme.Type === 'Recurring') counts.Recurring++;
    });

    return counts;
}, [filteredSchemes]);

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button
                onClick={() => handleButtonClick('Weekly')}
                className={`navlink2 ${selectedLoanType === 'Weekly' ? 'active' : ''}`}
              >
                <WeeklyD />
                Weekly Deposit ({schemeCounts.Weekly})
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              <button
                onClick={() => handleButtonClick('Monthly')}
                className={`navlink2 ${selectedLoanType === 'Monthly' ? 'active' : ''}`}
              >
                <MonthlyI />
                Monthly Income ({schemeCounts.Monthly})
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              <button
                onClick={() => handleButtonClick('Fixed')}
                className={`navlink2 ${selectedLoanType === 'Fixed' ? 'active' : ''}`}
              >
                <FixedD />
                Fixed Deposit ({schemeCounts.Fixed})
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              <button
                onClick={() => handleButtonClick('Recurring')}
                className={`navlink2 ${selectedLoanType === 'Recurring' ? 'active' : ''}`}
              >
                <RecurringD />
                Recurring Deposit ({schemeCounts.Recurring})
              </button>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 items-center justify-between px-[16px] box-border">
          {mergedAccounts.map((account, index) => (
            <SchemeCard
              key={index}
              phoneno={account.Number}
              fullname={account.Name}
              address={account.Address}
              profilePicture={account.Photo}
              key1={account.Scheme.Identifier}
              id={account.Scheme.Scheme}
              amount={account.Scheme.Amount}
              plan={account.Scheme.Income}
              {...account}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemeRequest;
