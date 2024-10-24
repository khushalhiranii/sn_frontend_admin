import React from 'react'
import SavingAccHeader from '../../user/DesignSystem/SavingAccHeader'
import { useAgentSocket } from '../context/AgentSocketContext'

function ProfileAgent() {
  const { properties, activeLoans, bufferLoans, closedLoans, overdueLoans } = useAgentSocket();
  return (
    <div className="flex flex-col w-[75%] items-start justify-start pt-[1rem] mx-8 gap-[2rem] mq675:gap-[1rem]">
      
      <SavingAccHeader/>
      <div className='flex flex-row justify-center w-full gap-8'>
        <div className='flex flex-col justify-center w-[30%] rounded-lg gap-2 p-2 bg-[#D9E8FB]' >
          <div className='font-medium text-lg px-2' >Document Confirmed</div>
          <div className='flex flex-col gap-4 p-2'>
            <div className='flex flex-row justify-between'>
              <div>Request Assigned</div>
              <div>{properties.Pending.length + properties.Verified.length  }</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Completed</div>
              <div>{  properties.Verified.length  }</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Pending</div>
              <div>{  properties.Pending.length  }</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center w-[30%] rounded-lg gap-2 p-2 bg-[#D9E8FB]' >
          <div className='font-medium text-lg px-2' >Recoveries from person</div>
          <div className='flex flex-col gap-4 p-2'>
            <div className='flex flex-row justify-between'>
              <div>Added Recoveries</div>
              <div>{activeLoans.length + overdueLoans.length + bufferLoans.length + closedLoans.length }</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Completed Recoveries</div>
              <div>{activeLoans.length + closedLoans.length }</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Pending Recoveries</div>
              <div>{ overdueLoans.length + bufferLoans.length }</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProfileAgent