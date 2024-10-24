import React from 'react';
import { useAdminSocket } from '../context/AdminSocketContext';
import { useLocation } from 'react-router-dom';
import { useAgentSocket } from '../../agent/context/AgentSocketContext';

// Helper function to parse the "dd-mm-yyyy hh:mm:ss" format to a valid Date object
const parseDateTime = (dateString) => {
  const [date, time] = dateString.split(' ');
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day, ...time.split(':').map(Number));
};

function Notifications() {
  const location = useLocation();
  const role = location.pathname.includes('agent') ? 'agent' : 'admin';

  const { notifications } = role === 'admin' ? useAdminSocket() : useAgentSocket();
  const notificationArray = Object.values(notifications);

  // Sort the notifications by "Created" field in descending order
  const sortedNotifications = notificationArray.sort(
    (a, b) => parseDateTime(b.Created) - parseDateTime(a.Created)
  );

  return (
    <div className="flex flex-col w-[75%] items-start justify-start pt-[1rem] mx-8 gap-[1rem] mq675:gap-[1rem]">
      <div className="text-[32px] font-semibold">Notifications</div>
      {sortedNotifications.map((notification, index) => (
        <div key={index} className="flex flex-col w-full box-border gap-[3px] p-4 rounded-[4px] bg-[#E6F0FC]">
          <div className="flex flex-row justify-between">
            <div className="text-[20px] font-medium">{notification.Title}</div>
            <div>{notification.Created}</div>
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
