import React, { useState } from 'react';
import Agmng from '../../assets/ag-mng';
import Briefcase from '../../assets/briefcase';
import { useAdminSocket } from '../../context/AdminSocketContext';
import AgentInfo from './AgentInfo';
import axiosInstance from '../../../../axios.utils';

function AgentMngmt() {
  const [selectedLoanType, setSelectedLoanType] = useState('Agents');
  const { users, userData, accounts, loans, schemes } = useAdminSocket();
  console.log(Object.values(userData))

  

  // Function to filter data based on the selected loan type
  const getFilteredClients = () => {
    
    switch (selectedLoanType) {
      case 'Agents':
        return Object.values(users).filter(user => user?.Role === 'Agent');
      case 'Add Agent':
        return Object.values(userData).filter(data => {
          const user = Object.values(users).find(u => u.Identifier === data?.Identifier); // Fetch user from users object using userId
          return data?.Verification === "Verified" && user?.Role === "User";
        } );
      default:
        return [];
    }
  };

  // Set to track unique Identifiers
  const uniqueIdentifiers = new Set();
  console.log(getFilteredClients())

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
        Account: account.Account,
        Role: user.Role
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
            <button onClick={() => handleButtonClick('Agents')} className={`navlink2 ${selectedLoanType === 'Agents' ? 'active' : ''}`}>
                <Briefcase /> Our Agents
              </button>
              <button onClick={() => handleButtonClick('Add Agent')} className={`navlink2 ${selectedLoanType === 'Add Agent' ? 'active' : ''}`}>
                <Agmng /> Add Agents
              </button>
            </div>
          </div>

          {/* Display filtered and merged data */}
          <div className="w-full grid grid-cols-3 mq1275:grid-cols-2 mq850:grid-cols-1 items-center px-[24px] gap-6 box-border">
            {mergedAccounts.map((account, index) => (
              <AgentInfo
                key={index}
                phoneno={account.Number}
                fullname={account.Name}
                address={account.Address}
                profilePicture={account.Photo}
                key1={account.Identifier}
                accountno={account.Account}
                Role={account.Role}
                {...account}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentMngmt;
