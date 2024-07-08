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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/user/account/requests?status=Pending`);
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
      {users.map((user) => (
        <SavingCard
          key={user._id}
          key1={user._id} // Assuming `id` is a unique property of `user`
          profilePicture="/ellipse-245@2x.png"
          fullname={user.fullname}
          phoneno={user.phoneno}
        />
      ))}
    </div>
  );
}

export default CompletedKyc;
