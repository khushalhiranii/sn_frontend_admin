import React, { useState, useMemo } from 'react';
import Loader from '../../LoadingIndicator/Loader';
import { useAgentSocket } from '../context/AgentSocketContext';
import Time from '../../admin/assets/time';
import TodaysClient from '../components/TodaysClient';

function HomeAgent() {
  const { users, bufferLoans } = useAgentSocket();
  const [loanType, setLoanType] = useState('All Clients');

  // Merge loans with users based on Identifier
  const mergeWithUsers = (dataArray = []) => {
    return Array.isArray(dataArray)
      ? dataArray.map((item) => {
          const user = users.find((user) => user.Identifier === item.Identifier);
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

  // Filter overdueLoans based on loanType
  const filteredData = useMemo(() => {
    let loansArray = Array.isArray(bufferLoans) ? bufferLoans : [];

    if (loanType === 'Responded Clients') {
      loansArray = loansArray.filter((loan) => loan.Behaviour === 'Responded');
    } else if (loanType === 'Unresponded Clients') {
      loansArray = loansArray.filter((loan) => loan.Behaviour === 'Unresponded');
    }

    return mergeWithUsers(loansArray);
  }, [loanType, bufferLoans, users]);

  // Display loader if users or loans are not ready
  if (!users || !users.length || !bufferLoans || !bufferLoans.length) {
    return <Loader />;
  }

  return (
    // <div className="flex-1 flex flex-col items-start justify-start pt-[2rem] px-[0rem] pb-[0rem] box-border text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-[75%] items-start justify-start pt-[1rem] mx-8 gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button
                onClick={() => setLoanType('All Clients')}
                className={`navlink2 ${loanType === 'All Clients' ? 'active' : ''}`}
              >
                All Clients ({bufferLoans ? bufferLoans.length : 0})
              </button>
              <button
                onClick={() => setLoanType('Responded Clients')}
                className={`navlink2 ${loanType === 'Responded Clients' ? 'active' : ''}`}
              >
                Responded Clients ({bufferLoans.filter((loan) => loan.Behaviour === 'Responded').length})
              </button>
              <button
                onClick={() => setLoanType('Unresponded Clients')}
                className={`navlink2 ${loanType === 'Unresponded Clients' ? 'active' : ''}`}
              >
                Unresponded Clients ({bufferLoans.filter((loan) => loan.Behaviour === 'Unresponded').length})
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
                Installment={account.Installment}
              />
            ))}
          </div>
        </div>
      </div>
    // </div>
  );
}

export default HomeAgent;
