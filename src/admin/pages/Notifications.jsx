import React from 'react';
import { useAdminSocket } from '../context/AdminSocketContext';

function Notifications() {
  const { notifications } = useAdminSocket();
  const notificationArray = Object.values(notifications);

  // Helper function to extract date and time
  function extractDateTime(isoString) {
    const date = new Date(isoString);

    // Extract date in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Extract time in HH:MM format
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;

    return { date: formattedDate, time: formattedTime };
  }

  // Sort the notificationArray by the "Created" field in descending order
  const sortedNotifications = notificationArray.sort((a, b) => new Date(b.Created) - new Date(a.Created));

  return (
    <div className='flex-1 flex flex-col py-4 max-w-[calc(100%_-_344px)] gap-[16px]'>
      <div className='text-[32px] font-semibold'>Notifications</div>
      {sortedNotifications.map((notification, index) => (
        <div key={index} className='flex flex-col gap-[3px] p-4 rounded-[4px] bg-[#E6F0FC]'>
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

export default Notifications;
