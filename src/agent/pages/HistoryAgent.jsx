import React, { useState, useMemo } from 'react';
import Loader from '../../LoadingIndicator/Loader';
import { useAgentSocket } from '../context/AgentSocketContext';
import Time from '../../admin/assets/time';
import Apartment from '../../admin/assets/apartment';
import TodaysClient from '../components/TodaysClient';

function HistoryAgent() {
  const { users, closedLoans, properties } = useAgentSocket();
  const [loanType, setLoanType] = useState('Client Due Amounts');

  const mergeWithUsers = (dataArray = []) => {
    return Array.isArray(dataArray)
      ? dataArray.map((item) => {
          const user = users.find((user)=> user.Identifier === item.Identifier);
          const mergedAddress = user?.Address 
            ? Object.values(user.Address.Address).join(', ') 
            : '';
          return {
            ...item,
            User: user,
            MergedAddress: mergedAddress,
          };
        })
      : [];
  };

  const filteredData = useMemo(() => {
    const loansArray = Array.isArray(closedLoans) ? closedLoans : Object.values(closedLoans || {});
    const propertiesArray = Array.isArray(properties?.Verified) ? properties.Verified : Object.values(properties?.Verified || {});

    if (loanType === 'Client Due Amounts') {
      return mergeWithUsers(loansArray);
    } else if (loanType === 'Property Verifications') {
      return mergeWithUsers(propertiesArray);
    }
    return [];
  }, [loanType, closedLoans, properties, users]);

  console.log(filteredData)

  if (!users || !Object.keys(users).length || !properties) {
    return <Loader />;
  }

  return (
    // <div className="flex-1 flex flex-col items-start justify-start pt-[2rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
    <div className="flex flex-col w-[75%] items-start justify-start pt-[1rem] mx-8 gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button
                onClick={() => setLoanType('Client Due Amounts')}
                className={`navlink2 ${loanType === 'Client Due Amounts' ? 'active' : ''}`}
              >
                <Time /> Client Due Amounts ({closedLoans ? closedLoans.length : 0})
              </button>
              <button
                onClick={() => setLoanType('Property Verifications')}
                className={`navlink2 ${loanType === 'Property Verifications' ? 'active' : ''}`}
              >
                <Apartment /> Property Verifications ({properties.Verified?.length})
              </button>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 items-center justify-between px-[16px] box-border gap-4">
            {filteredData.map((account, index) => (
              <TodaysClient
                key={index}
                phoneno={account.User?.Number}
                fullname={account.User?.Name}
                address={account.Address? account.Address : ""}
                profilePicture={account.User?.Profile}
                key1={account.User?.Identifier}
                id={account.Loan ? account.Loan : account.Request}
                amount={account.Amount}
                Installment={account.Installment}
                Value={account.Value}
              />
            ))}
          </div>
        </div>
      </div>
    // </div>
  );
}

export default HistoryAgent;
