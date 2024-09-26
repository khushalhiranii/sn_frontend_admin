import React, { useState } from 'react'
import SavingAccHeader from '../../../DesignSystem/SavingAccHeader'
import Statement from '../../../DesignSystem/Statement'
import { useUserSocket } from '../../../context/UserSocketContext'

function AccountStatement() {
  const { user, transactions, account } = useUserSocket();
  const [pin, setPin] = useState('');
  const [isPinValid, setIsPinValid] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,4}$/.test(value)) { // Ensure only digits and limit to 4
      setPin(value);
    }

    if (value.length === 4 && value === user.Password) {
      setIsPinValid(true);
    } else {
      setIsPinValid(false);
    }
  };

  const handleSubmit = () => {
    if (isPinValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowBalance(true);
      }, 3000); // Simulate loading for 1.5 seconds
    } else {
      alert('Incorrect Pin');
    }
  };

  return (
    <div className='py-[32px] w-full flex justify-center items-center'>
      <div className='flex flex-col gap-[16px] w-[1092px] justify-center items-start'>
        <div className='font-semibold text-xl'>View Balance and Statement</div>
        <SavingAccHeader />
        <div className='flex flex-col w-full gap-[24px]'>
          {!showBalance ? (
            <div className='py-[8px] flex flex-col gap-[8px]'>
              <div className='text-xl font-medium'>View Your Account Balance</div>
              <div className='flex flex-row flex-wrap gap-[8px] justify-center'>
                <input
                  className='text-center rounded-[4px] placeholder:text-[#828282] placeholder:text-center bg-off-white focus:outline-none'
                  type='password'
                  placeholder='Enter Your Pin'
                  value={pin}
                  onChange={handlePinChange}
                />
                <button
                  onClick={handleSubmit}
                  disabled={pin.length !== 4}
                  className={`flex px-[64px] py-[8px] text-base text-white rounded-[4px] font-medium ${
                    pin.length === 4 ? 'bg-blue-700' : 'bg-[#B0CFF6]'
                  }`}
                >
                  Submit
                </button>
              </div>
              {isLoading && (
                <div className="flex justify-center items-center mt-[16px]">
                  <div className="spinner-border animate-spin rounded-full h-8 w-8 border-solid border-t-2 border-b-2 border-blue-700"></div>
                </div>
              )}
            </div>
          ) : (
            <div className='py-[8px] flex flex-col gap-[8px]'>
              <div className='text-xl font-medium'>Account Balance:
              <div className='flex flex-row flex-wrap gap-[8px] justify-center'> {account.Balance} ₹</div>
              </div>
            </div>
          )}
          <div className='py-[8px] flex flex-col gap-[16px]'>
            <div className='text-xl font-medium'>Statements</div>
            {transactions && transactions.length > 0 ? (
              <div className='flex flex-row gap-[8px] justify-between'>
                {transactions.map((transaction, index) => (
                  <div key={index} className='flex flex-col gap-[8px]'>
                    <Statement transaction={transaction} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center text-gray-500'>No transactions available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountStatement;
