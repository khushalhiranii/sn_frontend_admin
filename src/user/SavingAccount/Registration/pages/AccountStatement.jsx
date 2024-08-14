import React from 'react'
import SavingAccHeader from '../../../DesignSystem/SavingAccHeader'
import Statement from '../../../DesignSystem/Statement'

function AccountStatement() {
  return (
    <div className='py-[32px] w-full flex justify-center items-center'>
        <div className='flex flex-col gap-[16px] w-[1092px] justify-center items-start'>
            <div className='font-semibold text-xl' >View Balance and Statement</div>
            <SavingAccHeader/>
            <div className='flex flex-col w-full gap-[24px]'>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>View Your Account Balance</div>
                    <div className='flex flex-row flex-wrap gap-[8px] justify-center'>
                    <input 
                    className='text-center rounded-[4px] placeholder:text-[#828282] placeholder:text-center bg-off-white focus:outline-none' 
                    type='password' 
                    placeholder='Enter Your Pin'
                    />

                        <button className='flex px-[64px] py-[8px] text-base text-white bg-[#B0CFF6] rounded-[4px] font-medium'>Submit</button>
                    </div>
                </div>
                <div className='py-[8px] flex flex-col gap-[16px]'>
                    <div className='text-xl font-medium'>Statements</div>
                    <div className='flex flex-row gap-[8px] justify-between'>
                        <div className='flex flex-col gap-[8px]'>
                            <Statement/>
                        </div>
                        <div className='flex flex-col gap-[8px]'>
                            <Statement/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountStatement