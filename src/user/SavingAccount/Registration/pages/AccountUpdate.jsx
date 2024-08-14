import React from 'react'
import SavingAccHeader from '../../../DesignSystem/SavingAccHeader'
import { NavLink, Outlet } from 'react-router-dom'

function AccountUpdate() {
  return (
    <div className='py-[32px] w-full flex justify-center items-center'>
        <div className='flex flex-col gap-[16px] w-[1092px] justify-center items-start'>
            <SavingAccHeader/>
            <div className='flex flex-col w-full gap-[24px]'>
                <div className='py-[8px] flex flex-col gap-[24px] justify-center items-center'>
                    <div className='flex flex-row w-[652px] text-base font-semibold justify-between'>
                    <NavLink
                    to={'/saving-account/update/phone'}
                    className={({ isActive }) =>
                        `no-underline rounded-[8px] ${isActive ? 'bg-[#D9E8FB] text-black' : 'text-[#707070]'}`
                    }
                    >
                    <div className='flex flex-col p-[8px] gap-[8px] w-[154px] justify-center items-center'>
                        <img src='/replace 1.svg' className='w-[32px] h-[32px]' alt='Change Phone No.' />
                        <div>Change Phone No.</div>
                    </div>
                    </NavLink>
                    <NavLink
                    to={'/saving-account/update/mpin'}
                    className={({ isActive }) =>
                        `no-underline text-[#707070] rounded-[8px] ${isActive ? 'bg-[#D9E8FB] text-black' : ''}`
                    }
                    >
                    <div className='flex flex-col p-[8px] gap-[8px] w-[154px] justify-center items-center'>
                        <img src='/mpin.svg' className='w-[32px] h-[32px]' alt='Change Phone No.' />
                        <div>Change M-Pin</div>
                    </div>
                    </NavLink>
                    <NavLink
                    to={'/saving-account/update/mpin'}
                    className={({ isActive }) =>
                        `no-underline text-[#707070] rounded-[8px] ${isActive ? 'bg-[#D9E8FB] text-black' : ''}`
                    }
                    >
                    <div className='flex flex-col p-[8px] gap-[8px] w-[154px] justify-center items-center'>
                        <img src='/file-edit 1.svg' className='w-[32px] h-[32px]' alt='Change Phone No.' />
                        <div>Update your details</div>
                    </div>
                    </NavLink>
                    </div>
                    <div>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountUpdate