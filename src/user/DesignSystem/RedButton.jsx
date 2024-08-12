import React from 'react';

const RedButton = ({ label, onClick, className = '', ...props }) => {
  return (
    <button
      className={`cursor-pointer [border:none] py-[12px] px-[24px] bg-foundation-red-normal rounded-lg flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="relative text-base font-medium font-roboto text-white text-left inline-block">
        {label}
      </div>
    </button>
  );
};

export default RedButton;
