import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLoanContext } from '../context/LoanContext';

function Loans() {
  const { setSelectedLoan } = useLoanContext();

  const imgWithLabel = (src, label) => {
    return (
      <div className='w-full flex flex-col gap-[32px]'>
        
          <img src={src} className='h-[240px] w-[405.5px] rounded-2xl' alt={label} />
        
        <div className='flex justify-center w-[405.5px] text-[20px] font-semibold'>
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
      <div className='flex flex-row p-[64px] justify-between mq1275:flex-col mq1275:gap-[16px]'>
      <NavLink 
        to="/loanApplication" 
        className="no-underline text-black" 
        onClick={() => setSelectedLoan('Personal Loan')}
      >
        {imgWithLabel("/PL.png", "Personal Loan")}
      </NavLink>

        <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Instant Loan')}>
          {imgWithLabel("/IL.png", "Instant Loan")}
        </NavLink>
        <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Property Loan')}>
          {imgWithLabel("/PrL.png", "Property Loan")}
        </NavLink>
        </div>
        <div className='flex flex-row p-[64px] justify-evenly mq1275:flex-col mq1275:gap-[16px]'>
        <NavLink to="/loanApplication" className="no-underline text-black"  onClick={() => setSelectedLoan('Business Loan')}>
          {imgWithLabel("/BL.png", "Business Loan")}
        </NavLink>
        <NavLink to="/loanApplication" className="no-underline text-black"  onClick={() => setSelectedLoan('Micro Finance Loan')}>
          {imgWithLabel("/MFL.png", "Micro Finance Loan")}
        </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Loans;
