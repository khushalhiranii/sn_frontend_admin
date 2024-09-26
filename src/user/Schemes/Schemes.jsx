import React, { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useDepositContext } from '../context/SchemeContext'; 
import { useUserSocket } from '../context/UserSocketContext';
import Loader from '../../LoadingIndicator/Loader';

function Schemes() {
  const { setSelectedScheme } = useDepositContext();
  const [loading, setLoading] = useState(true);
  const { account } = useUserSocket();

  useEffect(() => {
    // Simulate loading effect after a brief delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  const imgWithLabel = (src, label) => {
    return (
      <div className='w-full flex flex-col gap-[32px]'>
        <div className='w-full'>
          <img src={src} className='h-[240px] w-[405.5px]' alt={label} />
        </div>
        <div className='flex justify-center text-[20px] font-semibold'>
          {label}
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  // Check if account is available and valid
  if (!account || Object.keys(account).length === 0) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex p-[64px]'>
        <img className='w-full' src='/schems.png' alt="Schemes"/>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row p-[64px] justify-between'>
          <NavLink 
            to="/schemeApplication" 
            className="no-underline text-black" 
            onClick={() => setSelectedScheme('Weekly')}
          >
            {imgWithLabel("/wd.png", "Weekly Deposit")}
          </NavLink>

          <NavLink to="/schemeApplication" className="no-underline text-black" onClick={() => setSelectedScheme('Recurring')}>
            {imgWithLabel("/rd.png", "Recurring Deposit")}
          </NavLink>
          <NavLink to="/schemeApplication" className="no-underline text-black" onClick={() => setSelectedScheme('Monthly')}>
            {imgWithLabel("/monthly.png", "Monthly Deposit")}
          </NavLink>
        </div>
        <div className='flex flex-row p-[64px] justify-center'>
          <NavLink to="/schemeApplication" className="no-underline text-black" onClick={() => setSelectedScheme('Fixed')}>
            {imgWithLabel("/fixedDeposit.png", "Fixed Deposit")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Schemes;
