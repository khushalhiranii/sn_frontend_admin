import React from 'react';

const CustomInput = ({ placeholder, iconSrc, className = '', onChange, ...props }) => {
  return (
    <div className={`flex flex-row items-center justify-center px-[12px] py-[12px] gap-[12px] border-[2px] border-solid border-foundation-white-normal-hover rounded hover:bg-dimgray-200 hover:border-dimgray-100 ${className}`}>
      <img
        className="h-[16px] w-[16px] relative overflow-hidden shrink-0"
        alt=""
        src={iconSrc}
      />
      <input
        type="text"
        className="bg-[transparent] text-[1.125rem] font-roboto placeholder:text-foundation-blue-normal text-foundation-blue-normal text-left focus:outline-none"
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
