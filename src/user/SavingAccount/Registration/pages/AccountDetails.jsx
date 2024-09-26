import React from 'react'
import UserInfo from '../../../DesignSystem/UserInfo'
import SavingAccHeader from '../../../DesignSystem/SavingAccHeader'
import { useUserSocket } from '../../../context/UserSocketContext'
import { extractDateTime } from '../../../../admin/extractDateTime';

function AccountDetails() {
    const { user, userData, account } = useUserSocket();
  return (
    <div className='py-[32px] w-full flex justify-center items-center'>
        <div className='flex flex-col gap-[16px] w-[1092px] justify-center items-start'>
            <div className='font-semibold text-xl' >Saving Account Details</div>
            <SavingAccHeader/>
            <div className='flex flex-col w-full gap-[24px]'>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>Account Information</div>
                    <div className='flex flex-row flex-wrap gap-[16px] justify-between'>
                        <UserInfo label={"Account Number"} value={account.Account}/>
                        <UserInfo label={"Account Opening Date"} value={extractDateTime(account.Created).date}/>
                        <UserInfo label={"Account Status"} value={account.Status}/>
                        <UserInfo label={"IFSC Code"} value={"Value"}/>
                    </div>
                </div>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>Employment Details</div>
                    <div className='flex flex-row flex-wrap gap-[16px] justify-between'>
                        <UserInfo label={"Employee Type"} value={userData.Employment}/>
                        {/* <UserInfo label={"Major Source of Income"} value={"Value"}/> */}
                        <UserInfo label={"Income"} value={userData.Salary}/>
                    </div>
                </div>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>Address</div>
                    <div className='flex flex-row flex-wrap gap-[16px] justify-between'>
                        <UserInfo label={"Address Line 1"} value={userData.Address.Address[1]}/>
                        <UserInfo label={"Address Line 2"} value={userData.Address.Address[2]}/>
                        <UserInfo label={"State"} value={userData.Address.State}/>
                        <UserInfo label={"City"} value={userData.Address.City}/>
                        <UserInfo label={"Zip Code"} value={userData.Address.Zip}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountDetails