import React, { useState } from 'react';
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

  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const loansArray = Object.values(loans);
    const requestsArray = Object.values(requests);

    // Filter loans by status and selectedLoanType
    const filteredLoans = requestsArray.filter((loan) => {
      // If "Business Loan" is selected, include both "Self Business" and "Joint Business"
      if (selectedLoanType === 'Business') {
        return loan.Status !== 'Active' && loan.Status !== 'Rejected' && (loan.Type === 'Self Business' || loan.Type === 'Joint Business');
      }

      // For other loan types, just match with selectedLoanType
      return loan.Status !== 'Active' && loan.Status !== 'Rejected' && loan.Type === selectedLoanType;
    });

    // Merge the data based on the "Identifier"
    const mergedData = filteredLoans.map((loan) => {
      const user = usersArray.find((u) => u.Identifier === loan.Identifier);
      const data = userDataArray.find((d) => d.Identifier === loan.Identifier);

      // Merge addresses if there are multiple entries
      const mergedAddress = data ? Object.values(data.Address.Address).join(', ') : '';

      return {
        ...loan, // Include loan details
        Name: user?.Name,
        Number: user?.Number,
        Address: mergedAddress,
        Photo: data?.Photo,
      };
    });

    return mergedData;
  };

  // Get filtered and merged data
  const mergedAccounts = getMergedData();
  console.log(mergedAccounts)

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            {/* Loan type buttons */}
            <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">  
                <button onClick={() => handleButtonClick('Property')} className={`navlink2 ${selectedLoanType === 'Property' ? 'active' : ''}`}>
                  <Apartment /> Property Loan
                </button>
              </div>
              <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                <button onClick={() => handleButtonClick('Instant')} className={`navlink2 ${selectedLoanType === 'Instant' ? 'active' : ''}`}>
                  <Time /> Instant Loan
                </button>
              </div>
              <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                <button onClick={() => handleButtonClick('Personal')} className={`navlink2 ${selectedLoanType === 'Personal' ? 'active' : ''}`}>
                  <Hr /> Personal Loan
                </button>
              </div>
              <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                <button onClick={() => handleButtonClick('Business')} className={`navlink2 ${selectedLoanType === 'Self Business' ? 'active' : ''}`}>
                  <Briefcase /> Business Loan
                </button>
              </div>
            </div>
          </div>
          {/* Display filtered and merged data */}
          <div className="w-full flex flex-row flex-wrap gap-[16px] items-center justify-between px-[16px] box-border">
            {mergedAccounts.map((account, index) => (
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
