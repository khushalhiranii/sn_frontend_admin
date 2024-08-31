// CompletedKyc.jsx
import React, { useState, useEffect } from 'react';
import SavingCard from './saving-card';
import io from 'socket.io-client';
import { useAdminSocket } from '../context/AdminSocketContext';
// import useAxios from '../axiosSetup';
// import { socket } from '../socket'; // Import your socket instance

function CompletedKyc() {
  const [users, setUsers] = useState([]);
  // const axios = useAxios();
  const { subscribeToEvent } = useAdminSocket();

  useEffect(() => {
    
  const unsubscribe = subscribeToEvent('B0D448107911CFA3DB034F04F007C513', (data) => {
      console.log(data);
  });
  
  // subscribeToEvent('connect_error', (error) => {
  //     console.error('Connection error:', error);
  // });

    // Cleanup the event listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="overflow-y-visible self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem_1.5rem] min-h-[44.75rem] max-w-full">
      {users.map((user) => (
        <SavingCard
          key={user._id}
          key1={user._id}
          profilePicture={user.accountInfo.photo}
          fullname={user.fullname}
          phoneno={user.phoneno}
          address={`${user.accountInfo.address1}, ${user.accountInfo.address2}, ${user.accountInfo.city}`}
        />
      ))}
    </div>
  );
}

export default CompletedKyc;
