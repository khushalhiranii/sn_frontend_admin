import React from 'react'
import UserInfo from '../../../DesignSystem/UserInfo'
import SavingAccHeader from '../../../DesignSystem/SavingAccHeader'

function AccountDetails() {
  return (
    <div className='py-[32px] w-full flex justify-center items-center'>
        <div className='flex flex-col gap-[16px] w-[1092px] justify-center items-start'>
            <div className='font-semibold text-xl' >Saving Account Details</div>
            <SavingAccHeader/>
            <div className='flex flex-col w-full gap-[24px]'>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>Account Information</div>
                    <div className='flex flex-row flex-wrap gap-[16px] justify-between'>
                        <UserInfo label={"Account Number"} value={"Value"}/>
                        <UserInfo label={"Account Opening Date"} value={"Value"}/>
                        <UserInfo label={"Account Status"} value={"Value"}/>
                        <UserInfo label={"IFSC Code"} value={"Value"}/>
                    </div>
                </div>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>Employment Details</div>
                    <div className='flex flex-row flex-wrap gap-[16px] justify-between'>
                        <UserInfo label={"Employee Type"} value={"Value"}/>
                        <UserInfo label={"Major Source of Income"} value={"Value"}/>
                        <UserInfo label={"Select Income"} value={"Value"}/>
                    </div>
                </div>
                <div className='py-[8px] flex flex-col gap-[8px]'>
                    <div className='text-xl font-medium'>Address</div>
                    <div className='flex flex-row flex-wrap gap-[16px] justify-between'>
                        <UserInfo label={"Address Line 1"} value={"Value"}/>
                        <UserInfo label={"Address Line 2"} value={"Value"}/>
                        <UserInfo label={"State"} value={"Value"}/>
                        <UserInfo label={"City"} value={"Value"}/>
                        <UserInfo label={"Zip Code"} value={"Value"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountDetails