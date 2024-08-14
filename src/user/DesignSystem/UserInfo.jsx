import React from 'react'

function UserInfo({label, value}) {
  return (
    <div className='flex flex-col w-[256px] p-[8px] gap-[2px] border border-solid border-[#707070] rounded-[8px] font-medium'>
        <div className='text-base'>{label}</div>
        <div className='text-xl text-[#707070]'>{value}</div>
    </div>
  )
}

export default UserInfo