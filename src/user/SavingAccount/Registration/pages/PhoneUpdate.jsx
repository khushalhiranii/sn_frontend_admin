import React from 'react'
import RedButton from '../../../DesignSystem/RedButton'

function PhoneUpdate() {
  return (
    <div className='flex flex-col mt-[32px] gap-[16px]'>
      <div className='flex flex-row gap-[16px]'>
        <input className=' border border-t-0 p-[8px] border-x-0 text-base' placeholder='Enter Your current no' />
        <button className='px-[8px] py-[4px] text-base bg-[#B0D0F7] text-white rounded-[4px]' >Send OTP</button>
      </div>
      <div className='flex flex-row gap-[16px]'>
        <input className=' border border-t-0 p-[8px] border-x-0 text-base' placeholder='Enter OTP' />
      </div>
      <RedButton label={"Submit"}/>
    </div>
  )
}

export default PhoneUpdate