import React, { useEffect } from 'react';
import RedButton from '../../user/DesignSystem/RedButton';
import { useLoanInfoContext } from '../pages/Loan-Info/LoanInfoContext';
import { useNavigate } from 'react-router-dom';

function LoanDetails({ component: Component, label, type }) {
  const { mergedData, setSelectedLoanType } = useLoanInfoContext();
  const navigate = useNavigate();

  // Set selectedLoanType when the component mounts
  useEffect(() => {
    setSelectedLoanType(type);
  }, [type, setSelectedLoanType]);

  const checkLoan = ()=>{
    setSelectedLoanType(type);
    navigate('/admin/loanInfo/ApprovedLoans')
  }

  const filteredLoans = mergedData.filter(
    (loan) => loan.Loan.Status !== 'Pending' && loan.Loan.Status !== 'Rejected' && loan.Loan.Type === type
  );

  // Use mergedData directly from context
  return (
    <div className="inline-flex flex-col w-[500px] h-[252px] justify-center items-start gap-4 px-4 rounded-xl border border-solid border-foundation-white-normal-hover">
      <div className='flex flex-row gap-[8px] text-[20px] font-medium items-center'>
        <div className='p-[16px]'>
          <Component width={32} height={32} />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <div>{label}</div>
          <div>{filteredLoans.length}</div> {/* Displaying count of filtered data */}
        </div>
      </div>
      <div className='flex flex-col gap-[8px] w-full'>
        <div className='flex flex-row justify-between w-full'> 
          <div>Total Approved Amount</div>
          <div>₹000</div> {/* Replace with dynamic value if needed */}
        </div>
        <div className='flex flex-row justify-between w-full'> 
          <div>Total Recovered</div>
          <div>₹000</div> {/* Replace with dynamic value if needed */}
        </div>
        <div className='flex flex-row justify-between w-full'> 
          <div>Unrecovered</div>
          <div>₹000</div> {/* Replace with dynamic value if needed */}
        </div>
      </div>
      <RedButton label={"View Full Details"} onClick={checkLoan} className='w-full' />
    </div>
  );
}

export default LoanDetails;
