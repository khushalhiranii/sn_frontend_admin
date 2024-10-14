import React, { useState } from 'react';
import Agmng from '../../assets/ag-mng';
import Briefcase from '../../assets/briefcase';
import { useAdminSocket } from '../../context/AdminSocketContext';
import AgentInfo from './AgentInfo';
import axiosInstance from '../../../../axios.utils';
import { useNavigate } from 'react-router-dom';

function AgentMngmt() {
  const navigate = useNavigate();
  const [selectedLoanType, setSelectedLoanType] = useState('Agents');
  const { users, userData, accounts, loans, schemes } = useAdminSocket();
  console.log(Object.values(userData))

  

  // Function to filter data based on the selected loan type
  const getFilteredClients = () => {
    
    switch (selectedLoanType) {
      case 'Agents':
        return Object.values(users).filter(user => user?.Role === 'Agent');
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
      <div className='flex flex-row w-full justify-end'>
        <button onClick={()=>navigate('/admin/agmgmt/addAgent')} className='flex flex-row gap-[16px] items-center text-[16px] text-[#0166E4CC] font-semibold px-[24px] py-[12px] bg-white border border-solid rounded-lg border-[#E6F0FC] hover:bg-[#0166E4CC] hover:text-white transition-all duration-500 ease-in-out'>
          <div>
          Add Agent
          </div>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_6473_15542)">
              <path d="M19 0H5C2.243 0 0 2.243 0 5V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM16 13H13V16C13 16.553 12.552 17 12 17C11.448 17 11 16.553 11 16V13H8C7.448 13 7 12.553 7 12C7 11.447 7.448 11 8 11H11V8C11 7.447 11.448 7 12 7C12.552 7 13 7.447 13 8V11H16C16.552 11 17 11.447 17 12C17 12.553 16.552 13 16 13Z" fill="currentColor" fillOpacity="1"/>
            </g>
            <defs>
              <clipPath id="clip0_6473_15542">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            {/* Loan type buttons */}
            <div className="flex-auto flex flex-row box-border rounded-xl items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button onClick={() => handleButtonClick('Agents')} className={`navlink2 ${selectedLoanType === 'Agents' ? 'active' : ''}`}>
                <Briefcase /> Our Agents
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
