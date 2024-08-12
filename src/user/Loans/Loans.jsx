import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDepositContext } from '../context/SchemeContext'; 

function Loans() {
  const { setSelectedScheme } = useDepositContext();

  const imgWithLabel = (src, label) => {
    return (
      <div className='w-full flex flex-col gap-[32px]'>
        <div className='w-full'>
          <img src={src} className='h-[240px] w-[405.5px] rounded-2xl' alt={label} />
        </div>
        <div className='flex justify-center text-[20px] font-semibold'>
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className=' flex flex-col'>
      <div className='flex p-[64px]'>
        <img className='w-full' src='/loans.png' alt="Schemes"/>
      </div>
      <div className='flex flex-col'>
      <div className='flex flex-row p-[64px] justify-between'>
      <NavLink 
        to="/loanApplication" 
        className="no-underline text-black" 
        onClick={() => setSelectedScheme('Weekly Deposit')}
      >
        {imgWithLabel("/PL.png", "Personal Loan")}
      </NavLink>

        <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedScheme('Recurring Deposit')}>
          {imgWithLabel("/IL.png", "Instant Loan")}
        </NavLink>
        <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedScheme('Monthly Deposit')}>
          {imgWithLabel("/PrL.png", "Property Loan")}
        </NavLink>
        </div>
        <div className='flex flex-row p-[64px] justify-evenly'>
        <NavLink to="/loanApplication" className="no-underline text-black"  onClick={() => setSelectedScheme('Fixed Deposit')}>
          {imgWithLabel("/BL.png", "Business Loan")}
        </NavLink>
        <NavLink to="/loanApplication" className="no-underline text-black"  onClick={() => setSelectedScheme('Fixed Deposit')}>
          {imgWithLabel("/MFL.png", "Micro Finance Loan")}
        </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Loans;
