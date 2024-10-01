import React, { useState, useMemo } from 'react';
import Briefcase from '../../assets/briefcase';
import Hr from '../../assets/hr-person';
import Time from '../../assets/time';
import Apartment from '../../assets/apartment';
import { useAdminSocket } from '../../context/AdminSocketContext';
import LoanCard from '../../components/LoanCard';

function LoanRequest() {
  const [selectedLoanType, setSelectedLoanType] = useState('Property'); // Default type
  const { users, userData, loans, requests } = useAdminSocket();

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  const getMergedData = useMemo(() => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const requestsArray = Object.values(requests);

    // Filter and merge data
    const mergedData = requestsArray.map((loan) => {
      const user = usersArray.find((u) => u.Identifier === loan.Identifier);
      const data = userDataArray.find((d) => d.Identifier === loan.Identifier);

      const mergedAddress = data ? Object.values(data.Address.Address).join(', ') : '';

      return {
        ...loan,
        Name: user?.Name,
        Number: user?.Number,
        Address: mergedAddress,
        Photo: data?.Photo,
      };
    });

    return mergedData;
  }, [users, userData, requests]);

  // Count loan types
  const loanCounts = useMemo(() => {
    const counts = { Property: 0, Instant: 0, Personal: 0, Business: 0 };

    getMergedData.forEach((loan) => {
      if (loan.Type === 'Property') counts.Property++;
      if (loan.Type === 'Instant') counts.Instant++;
      if (loan.Type === 'Personal') counts.Personal++;
      if (loan.Type === 'Self Business' || loan.Type === 'Joint Business') counts.Business++;
    });

    return counts;
  }, [getMergedData]);

  // Get filtered and merged data based on the selected loan type
  const filteredAccounts = getMergedData.filter((loan) => {
    if (selectedLoanType === 'Business') {
      return loan.Status !== 'Active' && loan.Status !== 'Rejected' && (loan.Type === 'Self Business' || loan.Type === 'Joint Business');
    }
    return loan.Status !== 'Active' && loan.Status !== 'Rejected' && loan.Type === selectedLoanType;
  });

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            {/* Loan type buttons */}
            <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <div className="flex-auto flex flex-row items-center justify-center">
                <button onClick={() => handleButtonClick('Property')} className={`navlink2 ${selectedLoanType === 'Property' ? 'active' : ''}`}>
                  <Apartment /> Property Loan ({loanCounts.Property})
                </button>
              </div>
              <div className="flex-auto flex flex-row items-center justify-center">
                <button onClick={() => handleButtonClick('Instant')} className={`navlink2 ${selectedLoanType === 'Instant' ? 'active' : ''}`}>
                  <Time /> Instant Loan ({loanCounts.Instant})
                </button>
              </div>
              <div className="flex-auto flex flex-row items-center justify-center">
                <button onClick={() => handleButtonClick('Personal')} className={`navlink2 ${selectedLoanType === 'Personal' ? 'active' : ''}`}>
                  <Hr /> Personal Loan ({loanCounts.Personal})
                </button>
              </div>
              <div className="flex-auto flex flex-row items-center justify-center">
                <button onClick={() => handleButtonClick('Business')} className={`navlink2 ${selectedLoanType === 'Business' ? 'active' : ''}`}>
                  <Briefcase /> Business Loan ({loanCounts.Business})
                </button>
              </div>
            </div>
          </div>
          {/* Display filtered and merged data */}
          <div className="w-full grid grid-cols-3 mq1275:grid-cols-2 mq850:grid-cols-1 items-center px-[24px] gap-6 box-border">
            {filteredAccounts.map((account, index) => (
              <LoanCard
                key={index}
                phoneno={account.Number}
                fullname={account.Name}
                address={account.Address}
                profilePicture={account.Photo}
                key1={account.Identifier}
                id={account.Request}
                amount={account.Amount}
                loan={account?.Request}
                {...account}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRequest;
