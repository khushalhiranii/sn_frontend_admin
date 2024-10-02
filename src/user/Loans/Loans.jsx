import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLoanContext } from '../context/LoanContext';
import RedButton from '../DesignSystem/RedButton';
import { useUserSocket } from '../context/UserSocketContext';

function Loans() {
  const { setSelectedLoan } = useLoanContext();
  const { requests = [], products } = useUserSocket(); // Ensure requests defaults to an empty array if undefined

  // Check if requests is an array before filtering
  const offeredArray = Array.isArray(requests) ? requests.filter(request => request.Status === "Offered") : [];
  console.log(offeredArray);

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
    <div className=' flex flex-col p-[64px] gap-[64px]'>
      <div className='flex'>
        <img className='w-full' src='/loans.png' alt="Schemes"/>
      </div>
      <div className='w-full flex flex-row items-center justify-between bg-[#F5F5F5] px-[32px] py-[16px] box-border rounded-[12px]' >
        <div className='flex flex-row bg-[#F2DAE3] px-[40px] py-[18px] gap-[36px] items-center box-border rounded-[5px]' >
          <div className='text-[24px] font-semibold'>Pre Approved Business Loan</div>
          <div className='flex flex-col text-[16px] gap-[16px] font-normal' >
            <div>Amount: 20000</div>
            <div>Tenure: 40</div>
          </div>
        </div>
        <div className='text-[20px] font-semibold flex flex-col items-center justify-center' >
          <div>₹ 99</div>
          <div>Weekly</div>
        </div>
        <RedButton label={"Avail Now"} className='w-[20%] h-[46px]' />
        
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between mq1275:flex-col mq1275:gap-[16px]'>
          <NavLink 
            to="/loanApplication" 
            className="no-underline text-black" 
            onClick={() => setSelectedLoan('Personal Loan')}
          >
            {imgWithLabel("/PL.png", "Personal Loan")}
          </NavLink>

          <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Instant')}>
            {imgWithLabel("/IL.png", "Instant Loan")}
          </NavLink>
          <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Property')}>
            {imgWithLabel("/PrL.png", "Property Loan")}
          </NavLink>
          </div>
          <div className='flex flex-row p-[64px] justify-evenly mq1275:flex-col mq1275:gap-[16px]'>
          <NavLink to="/loanApplication" className="no-underline text-black"  onClick={() => setSelectedLoan('Business')}>
            {imgWithLabel("/BL.png", "Business Loan")}
          </NavLink>
          <NavLink to="/loanApplication" className="no-underline text-black"  onClick={() => setSelectedLoan('Micro Finance')}>
            {imgWithLabel("/MFL.png", "Micro Finance Loan")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Loans;
