import React from 'react';

function InputReg({ label, type, placeholder, onChange, id, className = '', value }) {
  return (
    <div className="flex flex-col w-full md:flex-row items-start justify-start gap-[8px] md:gap-2">
      <label htmlFor={id} className={`min-w-[3.938rem] text-sm font-normal text-black ${className}`}>
        {label}
      </label>
      <input
        id={id}
        className={`w-full h-[48px] rounded-lg border border-solid border-foundation-white-normal-active outline-none focus:outline-none placeholder:text-[17px] placeholder:font-medium placeholder:text-foundation-white-normal-hover placeholder:flex placeholder:flex-col placeholder:items-center box-border ${className}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        style={{padding: '14px'}}
        value={value}
        required
      />
    </div>
  );
}

export default InputReg;
