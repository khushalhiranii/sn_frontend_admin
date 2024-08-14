import React, { useState } from 'react';
import RedButton from '../../../DesignSystem/RedButton';
import { useNavigate } from 'react-router-dom';

function AccountAction() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

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

  return (
    <div className='flex flex-col w-full justify-center pt-[64px]'>
      {count === 1 ? (
        <>
          <div className='flex justify-center'>
            <img src='image.png' className='h-[504px] w-[872px]' alt='Account Action' />
          </div>
          <div className='flex justify-center mt-8'>
            <RedButton label={"Open Saving Account"} onClick={() => setCount(2)} />
          </div>
        </>
      ) : count === 2 ? (
        <div className='flex justify-center gap-[32px]'>
          {actions("Saving Account Details", "/piggy.svg", "info")}
          {actions("View Balance & Statements", "/balance.svg", "statement")}
          {actions("Update Account Info", "/updateAcc.svg", "update")}
        </div>
      ) : null}
    </div>
  );
}

export default AccountAction;
