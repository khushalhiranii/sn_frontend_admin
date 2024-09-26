import React, { useEffect, useState } from 'react';
import RedButton from '../../../DesignSystem/RedButton';
import { useNavigate } from 'react-router-dom';
import { useUserSocket } from '../../../context/UserSocketContext';

function AccountAction() {
  const navigate = useNavigate();
  const { user, account } = useUserSocket();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const actions = (label, img, route) => {
    return (
      <div
        className='flex flex-col justify-between h-[300px] w-[300px] font-roboto bg-custom-blue rounded-[8px] cursor-pointer'
        onClick={() => navigate(`/saving-account/${route}`)}
      >
        <div className='w-[169px] p-[8px] mt-[8px] flex text-base font-medium'>{label}</div>
        <div className='flex flex-row justify-end'>
          <img src={img} alt={label} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center mt-[16px] min-h-screen">
        <div className="spinner-border animate-spin rounded-full h-8 w-8 border-solid border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  // If the user is not fetched or not verified, navigate to login
  if (!user || user?.Verification !== true || !account ) {
    return (
    <div>
      <div className='flex justify-center'>
        <img src='image.png' className='h-[504px] w-[872px]' alt='Account Action' />
      </div>
      <div className='flex justify-center mt-8'>
        <RedButton label={"Open Saving Account"} onClick={() => navigate('/register/openAcc')} />
      </div>
    </div>);
  }

  if( !user || user?.Verification !== true || account?.Status === "Pending" ){
    return(
      <div className="flex flex-col items-center justify-center pt-4 w-full">
  <div className="flex flex-row items-center bg-white p-6 rounded-md shadow-lg">
    {/* SVG Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-yellow-500 mr-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z"
      />
    </svg>
    {/* Message */}
    <span className="text-gray-800 font-medium text-lg">
      Your request to open a savings account is in queue, we'll notify you once it's accepted.
    </span>
  </div>
</div>

    )
  }

  return (
    <div className='flex flex-col w-full justify-center pt-[64px]'>
      <div className='flex flex-wrap justify-center gap-[32px]'>
        {actions("Saving Account Details", "/piggy.svg", "info")}
        {actions("View Balance & Statements", "/balance.svg", "statement")}
        {actions("Update Account Info", "/updateAcc.svg", "update")}
      </div>
    </div>
  );
}

export default AccountAction;
