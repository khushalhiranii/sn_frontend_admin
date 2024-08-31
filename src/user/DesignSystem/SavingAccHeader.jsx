import React from 'react'

function SavingAccHeader() {
  return (
    <div className='p-[8px] w-full gap-[16px] flex flex-row bg-off-white rounded-[16px]' >
        <img src='/sn.svg' className='w-[100px] h-[100px] rounded-[8px]'/>
        <div className='flex flex-col text-base font-normal gap-[4px] justify-center'>
            <div>Customer ID: </div>
            <div>Name:</div>
            <div>Phone No:</div>
        </div>
    </div>
  )
}

export default SavingAccHeader