import React from 'react'

function Statement() {
  return (
    <div className='bg-off-white px-[16px] py-[8px] flex flex-row justify-between w-[510px] rounded-[8px]'>
        <div className='flex flex-col gap-[8px]'>
            <div className='text-base font-medium'>Name</div>
            <div className='text-sm font-normal'>March 3, 2024 at 2:30pm</div>
        </div>
        <div className='flex flex-col gap-[8px]'>
            <div className='text-base font-medium'>Amount: 30,000</div>
            <div className='text-sm font-normal text-green-500'>+ Credited</div>
        </div>
    </div>
  )
}

export default Statement