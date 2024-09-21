import React from 'react'
import { useAdminSocket } from '../context/AdminSocketContext'

function Notifications() {
  const { notifications } = useAdminSocket();
  console.log(notifications)
  const notificationArray = Object.values(notifications)
  console.log(notificationArray)
  const filteredNotifications = notificationArray.filter((notification) => notification.categoty === "Admin")
  console.log(filteredNotifications)
  return (
    <div className='flex-1 flex flex-col py-4  max-w-[calc(100%_-_344px)] gap-[16px]'>
      <div className='text-[32px] font-semibold'>Notification</div>
      {filteredNotifications.map((notification, index) => (
        <div key={index} className='flex flex-col gap-[3px] p-4 rounded-[4px] bg-[#E6F0FC]'>
        <div className='flex flex-row justify-between'>
        <div className='text-[20px] font-medium'>{notification.Title}</div>
        <div>DD/Time</div>
        </div>
        <div>
        Customer ID : ************
        </div>
        <div>
        Loan Type : ************
        </div>
        <div>
        Due in Day's : ************
        </div>
        <div>
        Due Amount : ************
        </div>
      </div>
      ))}
      {/* <div className='flex flex-col w-full gap-[8px]'>
        
        <div className='flex flex-col gap-[3px] p-4 rounded-[4px] bg-[#E6F0FC]'>
          <div className='flex flex-row justify-between'>
            <div className='text-[20px] font-medium'>Loan Request</div>
            <div>DD/Time</div>
          </div>
          <div>
          Customer ID : ************
          </div>
          <div>
          Name : ************
          </div>
          <div>
          Phone No : ************
          </div>
          <div>
          Address : ************
          </div>
          <div>
          Loan Type : ************
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Notifications