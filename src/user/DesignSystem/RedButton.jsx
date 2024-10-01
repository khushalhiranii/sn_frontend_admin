import React from 'react';

const RedButton = ({
  label,
  type,
  onClick,
  className = '',
  disabled,
  loading = false,
  padding = 'py-[12px] px-[24px]', // Default padding
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${className} cursor-pointer [border:none] ${padding} bg-foundation-red-normal  rounded flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred-100 ${disabled && 'opacity-50 cursor-not-allowed'} ${className}`}
      onClick={onClick}
      disabled={disabled} // Disable button when loading
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="spinner-border spinner-border-sm border-solid border-white border-t-transparent border-4 rounded-full w-4 h-4 animate-spin"></div>
        </div>
      ) : (
        <div className="relative text-base font-medium font-roboto text-white text-left inline-block ">
          {label}
        </div>
      )}
    </button>
  );
};

export default RedButton;
