import React, { useState, useMemo } from 'react';
import Loader from '../../LoadingIndicator/Loader';
import { useAgentSocket } from '../context/AgentSocketContext';
import Time from '../../admin/assets/time';
import Apartment from '../../admin/assets/apartment';
import TodaysClient from '../components/TodaysClient';

function HomeAgent() {
  const { users, todaysLoans, properties } = useAgentSocket();
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
    const loansArray = Array.isArray(todaysLoans) ? todaysLoans : Object.values(todaysLoans || {});
    const propertiesArray = Array.isArray(properties?.Todays) ? properties.Todays : Object.values(properties?.Todays || {});

    if (loanType === 'Client Due Amounts') {
      return mergeWithUsers(loansArray);
    } else if (loanType === 'Property Verifications') {
      return mergeWithUsers(propertiesArray);
    }
    return [];
  }, [loanType, todaysLoans, properties, users]);

  if (!users || !Object.keys(users).length || !properties) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-start justify-start pt-[2rem] w-[75%] box-border mx-8 text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.937rem] max-w-full shrink-0 mq675:gap-[0.938rem]">
        <div className="w-[17.25rem] flex flex-row items-start justify-start relative shrink-0 text-[0.813rem] font-inter">
          <div className="flex-1 rounded bg-foundation-red-normal flex flex-col items-start justify-start p-[0.5rem] gap-[0.5rem] z-[1]">
            <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[3.688rem]">
              {new Date().toLocaleDateString()}
            </a>
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] text-[1.25rem] font-roboto">
              <div className="flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[7.813rem] mq450:text-[1rem]">
                  Today’s Tasks
                </a>
              </div>
              <div className="h-[1.5rem] w-[1.5rem] relative bg-gainsboro" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button
                onClick={() => setLoanType('Client Due Amounts')}
                className={`navlink2 ${loanType === 'Client Due Amounts' ? 'active' : ''}`}
              >
                <Time /> Client Due Amounts ({todaysLoans ? todaysLoans.length : 0})
              </button>
              <button
                onClick={() => setLoanType('Property Verifications')}
                className={`navlink2 ${loanType === 'Property Verifications' ? 'active' : ''}`}
              >
                <Apartment /> Property Verifications ({properties.Todays?.length})
              </button>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 items-center justify-between px-[16px] box-border gap-4">
            {filteredData.map((account, index) => (
              <TodaysClient
                key={index}
                phoneno={account.User?.Number}
                fullname={account.User?.Name}
                address={account.MergedAddress}
                profilePicture={account.User?.Profile}
                key1={account.User?.Identifier}
                id={account.Loan ? account.Loan : account.Request}
                amount={account.Amount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAgent;
