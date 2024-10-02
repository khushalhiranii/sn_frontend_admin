import React from 'react';
import PropTypes from 'prop-types';
const FormInput = ({ label, placeholder, type = "text", value, onChange, className = "", inputClassName = "" }) => {
    return (
      <div className={`flex-1 flex flex-col items-start justify-center max-w-[306px] gap-[8px] min-w-[106px] ${className}`}>
        <div className="relative text-sm font-medium font-roboto text-black text-left inline-block min-w-[66px]">
          {label}
        </div>
        <div className="self-stretch rounded flex flex-row items-center justify-start py-[11px] px-3 border-[1px] border-solid border-foundation-white-normal-hover">
          <input
            className={`w-full border-none outline-none font-medium font-roboto text-base bg-transparent h-[19px] relative text-black text-left inline-block p-0 ${inputClassName}`}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  };
  
  FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
  };

  export default FormInput;