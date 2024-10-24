import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAgentSocket } from '../../agent/context/AgentSocketContext';
import { useUserSocket } from '../context/UserSocketContext';


function SavingAccHeader() {
  const location = useLocation();

  // Dynamically decide which context to use
  const socket = location.pathname.includes('agent')
    ? useAgentSocket()
    : useUserSocket();

  // Extract data based on context (agent or user)
  const data = location.pathname.includes('agent') ? socket.agent : socket.user;

  return (
    <div className='p-[8px] w-full gap-[16px] h-fit flex flex-row bg-off-white rounded-[16px] box-border'>
      <img src='/sn.svg' className='w-[100px] h-[100px] rounded-[8px]' />
      <div className='flex flex-col text-base font-normal gap-[4px] justify-center'>
        <div>Customer ID: {data.Identifier}</div>
        <div>Name: {data.Name}</div>
        <div>Phone No: {data.Number}</div>
      </div>
    </div>
  );
}

export default SavingAccHeader;
