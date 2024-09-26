import React from 'react';

import { extractDateTime } from '../../../../admin/extractDateTime';
import { useUserSocket } from '../../../context/UserSocketContext';

function UserNotifications() {
  const { notifications } = useUserSocket();
  const notificationArray = Object.values(notifications);

  // Helper function to extract date and time
  

  // Sort the notificationArray by the "Created" field in descending order
  const sortedNotifications = notificationArray.sort((a, b) => new Date(b.Created) - new Date(a.Created));

  return (
    <div className='flex flex-col items-center py-4 w-full gap-[16px]'>
      <div className='text-[32px] font-semibold'>Notifications</div>
      {sortedNotifications.map((notification, index) => (
        <div key={index} className='flex flex-col gap-[3px] w-[994px] p-4 rounded-[4px] bg-[#E6F0FC]'>
          <div className='flex flex-row justify-between'>
            <div className='text-[20px] font-medium'>{notification.Title}</div>
            <div>{extractDateTime(notification.Created).date} / {extractDateTime(notification.Created).time}</div>
          </div>
          <div>Description: {notification.Description}</div>
          <div>Customer ID: {notification.Identifier}</div>
          <div>Loan ID: {notification.Reference}</div>
        </div>
      ))}
    </div>
  );
}

export default UserNotifications;
