import React, { useMemo, useState } from 'react'
import WeeklyD from '../../assets/WeeklyD';
import MonthlyI from '../../assets/MonthlyI';
import FixedD from '../../assets/FixedD';
import RecurringD from '../../assets/RecurringD';
import Card1 from '../../components/InfoCard';
import { useAdminSocket } from '../../context/AdminSocketContext';

function SchemeInfo() {
  const [selectedLoanType, setSelectedLoanType] = useState('Weekly');
  
  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  const { users, userData, schemes } = useAdminSocket();

  const schemesArray = Object.values(schemes);

    // Filter loans by status and selectedLoanType
  const filteredSchemes = schemesArray.filter(
    (scheme) => scheme.Status != 'Pending' && scheme.Status != 'Rejected'
  );
  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const filteredSchemesWise = filteredSchemes.filter((scheme) => scheme.Type === selectedLoanType )
    

    // Merge the data based on the "Identifier"
    const mergedData = filteredSchemesWise.map((scheme) => {
      const user = usersArray.find((u) => u.Identifier === scheme.Identifier);
      const data = userDataArray.find((d) => d.Identifier === scheme.Identifier);
      // const scheme = schemesArray.find((s) => s.Identifier === scheme.Identifier);
      // Merge addresses if there are multiple entries
      const mergedAddress = data ? Object.values(data.Address.Address).join(', ') : '';

      return {
        Scheme: {...scheme}, // Include loan details
        Name: user?.Name,
        Number: user?.Number,
        Address: mergedAddress,
        Photo: data?.Photo,
      };
    });

    return mergedData;
  };

  const mergedAccounts = getMergedData();
  console.log(mergedAccounts)
  const schemeCounts = useMemo(() => {
    const counts = { Weekly: 0, Monthly: 0, Fixed: 0, Recurring: 0 };
    
    filteredSchemes.forEach((scheme) => {
        if (scheme.Type === 'Weekly') counts.Weekly++;
        if (scheme.Type === 'Monthly') counts.Monthly++;
        if (scheme.Type === 'Fixed') counts.Fixed++;
        if (scheme.Type === 'Recurring') counts.Recurring++;
    });

    return counts;
  }, [mergedAccounts]);



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
                <WeeklyD/>
                Weekly Deposit ({schemeCounts.Weekly})
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Monthly')}
                className={`navlink2 ${selectedLoanType === 'Monthly' ? 'active' : ''}`}
              >
                <MonthlyI/>
                Monthly Income ({schemeCounts.Monthly})
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Fixed')}
                className={`navlink2 ${selectedLoanType === 'Fixed' ? 'active' : ''}`}
              >
                <FixedD/>
                Fixed Deposit ({schemeCounts.Fixed})
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              
              <button
                onClick={() => handleButtonClick('Recurring')}
                className={`navlink2 ${selectedLoanType === 'Recurring' ? 'active' : ''}`}
              >
                <RecurringD/>
                Recurring Deposit ({schemeCounts.Recurring})
              </button>
            </div>
          </div>
          <div className="flex flex-row flex-wrap w-full items-start justify-between gap-[16px] px-[16px] box-border">
            {mergedAccounts.map((account, index) => (
                <Card1
                  key={index}
                  phoneno={account.Number}
                  fullname={account.Name}
                  address={account.Address}
                  profilePicture={account.Photo}
                  key1={account.Scheme.Identifier}
                  id={account.Scheme.Scheme}
                  amount={account.Scheme.Amount}
                  plan={account.Scheme.Income}
                  tenure={account.Scheme.Tenure}
                  {...account}
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeInfo;