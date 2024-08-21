import React from 'react';
import RedButton from '../../user/DesignSystem/RedButton';

function LoanDetails({ component: Component, label }) {
  return (
    <div className="inline-flex flex-col w-[500px] h-[252px] justify-center items-start gap-4 px-4 rounded-xl border border-solid border-foundation-white-normal-hover">
      <div className='flex flex-row gap-[8px] text-[20px] font-medium items-center'>
        <div className='p-[16px]' >
            <Component width={32} height={32} />
        </div>
        <div className='flex flex-col gap-[8px]'>
            <div>{label}</div>
            <div>8</div>
        </div>
      </div>
      <div className='flex flex-col gap-[8px] w-full'>
        <div className='flex flex-row justify-between w-full'> 
            <div>Total Approved Amount</div>
            <div>$000</div>
        </div>
        <div className='flex flex-row justify-between w-full'> 
            <div>Total Recovered</div>
            <div>$000</div>
        </div>
        <div className='flex flex-row justify-between w-full'> 
            <div>Unrecovered</div>
            <div>$000</div>
        </div>
      </div>
      <RedButton label={"View Full Details"} className='w-full' />
    </div>
  );
}

export default LoanDetails;
