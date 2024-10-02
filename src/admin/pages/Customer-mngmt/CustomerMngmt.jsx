import React, { useState } from 'react';
import Agmng from '../../assets/ag-mng';
import Time from '../../assets/time';
import Hr from '../../assets/hr-person';
import Briefcase from '../../assets/briefcase';
import { useAdminSocket } from '../../context/AdminSocketContext';
import CustomerInfo from './CustomerInfo';

function CustomerMngmt() {
  const [selectedLoanType, setSelectedLoanType] = useState('Clients');
  const { users, userData, accounts, loans, schemes } = useAdminSocket();

  // Function to filter data based on the selected loan type
  const getFilteredClients = () => {
    const accountsArray = Object.values(accounts);
    
    switch (selectedLoanType) {
      case 'Clients':
        return accountsArray.filter(account => account.Status === 'Verified');
      case 'Overdue':
        return Object.values(loans).filter(loan => loan.Status === 'Overdue');
      case 'Loan':
        return Object.values(loans).filter(loan => loan.Status === 'Pending');
      case 'Scheme':
        return Object.values(schemes).filter(scheme => scheme.Status === 'Pending');
      default:
        return [];
    }
  };

  // Set to track unique Identifiers
  const uniqueIdentifiers = new Set();

  // Merge users, userData, and accounts with filtered clients
  const mergedAccounts = getFilteredClients()
    .map(filteredClient => {
      const user = Object.values(users).find(user => user.Identifier === filteredClient.Identifier) || {};
      const userInfoArray = Object.values(userData).filter(userData => userData.Identifier === filteredClient.Identifier) || [];
      const account = Object.values(accounts).find(account => account.Identifier === filteredClient.Identifier) || {};
      
      const userInfo = userInfoArray[0] || {}; // Assuming the first element of the userInfo array
      const mergedAddress = userInfo.Address && userInfo.Address.Address
        ? Object.values(userInfo.Address.Address).join(', ')
        : '';

      return {
        ...filteredClient,
        Name: user.Name,
        Number: user.Number,
        Address: mergedAddress,
        Photo: userInfo.Photo,
        Identifier: user.Identifier,
        Account: account.Account
      };
    })
    // Filter for unique Identifiers
    .filter(account => {
      if (!uniqueIdentifiers.has(account.Identifier)) {
        uniqueIdentifiers.add(account.Identifier);
        return true;
      }
      return false;
    });

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            {/* Loan type buttons */}
            <div className="flex-auto flex flex-row box-border rounded-xl items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button onClick={() => handleButtonClick('Clients')} className={`navlink2 ${selectedLoanType === 'Clients' ? 'active' : ''}`}>
                <Agmng /> List of Clients
              </button>
              <button onClick={() => handleButtonClick('Overdue')} className={`navlink2 ${selectedLoanType === 'Overdue' ? 'active' : ''}`}>
                <Time /> Overdue Clients
              </button>
              <button onClick={() => handleButtonClick('Loan')} className={`navlink2 ${selectedLoanType === 'Loan' ? 'active' : ''}`}>
                <Hr /> Loan Applications
              </button>
              <button onClick={() => handleButtonClick('Scheme')} className={`navlink2 ${selectedLoanType === 'Scheme' ? 'active' : ''}`}>
                <Briefcase /> Scheme Applications
              </button>
            </div>
          </div>

          {/* Display filtered and merged data */}
          <div className="w-full grid grid-cols-3 mq1275:grid-cols-2 mq850:grid-cols-1 items-center px-[24px] gap-6 box-border">
            {mergedAccounts.map((account, index) => (
              <CustomerInfo
                key={index}
                phoneno={account.Number}
                fullname={account.Name}
                address={account.Address}
                profilePicture={account.Photo}
                key1={account.Identifier}
                accountno={account.Account}
                {...account}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerMngmt;
