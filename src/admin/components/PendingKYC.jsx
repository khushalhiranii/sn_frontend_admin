// CompletedKyc.jsx
import React, { useState, useEffect } from 'react';
import SavingCard from './saving-card';
import useAxios from '../axiosSetup';

function CompletedKyc() {
  const [users, setUsers] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/account/requests?status=Verified`);
        const users = res.data.data;
        setUsers(users);
        console.log(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-y-visible self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem_1.5rem] min-h-[44.75rem] max-w-full">
      {/* {(users) => ( */}
      {users.map((user)=>(
        <SavingCard
        key={user._id}
        key1={user._id} // Assuming `id` is a unique property of `user`
        profilePicture={user.accountInfo.photo}
        fullname={user.fullname}
        phoneno={user.phoneno}
        address= {`${user.accountInfo.address1}, ${user.accountInfo.address2}, ${user.accountInfo.city}`}
      />
      ))}
        
      {/* )} */}
    </div>
  );
}

export default CompletedKyc;
