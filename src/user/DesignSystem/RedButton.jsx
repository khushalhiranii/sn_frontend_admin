import React from 'react';

const RedButton = ({ label, onClick, className = '', disabled, loading = false, ...props }) => {
  return (
    <button
      className={`cursor-pointer [border:none] py-[12px] px-[24px] bg-foundation-red-normal rounded-lg flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred ${disabled && 'opacity-50 cursor-not-allowed'} ${className}`}
      onClick={onClick}
      disabled={disabled} // Disable button when loading
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="spinner-border spinner-border-sm border-solid border-white border-t-transparent border-4 rounded-full w-4 h-4 animate-spin"></div>
        </div>
      ) : (
        <div className="relative text-base font-medium font-roboto text-white text-left inline-block">
          {label}
        </div>
      )}
    </button>
  );
};

export default RedButton;
