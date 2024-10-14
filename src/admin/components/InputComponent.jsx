import React from 'react'

function InputComponent({ label, value, type="text", onChange }) {
  return (
    <div className="flex flex-col max-w-[306px] min-w-[106px] box-border items-start justify-normal p-1 gap-2 ">
                <div className="tracking-tight text-[14px] leading-[150%] font-medium min-w-[6.438rem]">
                  {label}
                </div>
                <input
                  className="w-full box-border outline-none text-[1rem] placeholder:text-black1 font-medium border-[#E3E3E3] rounded-[4px] border-[1px] border-solid p-[12px]"
                  placeholder="Value"
                  type={type}
                  value={value}
                  onChange={onChange}
                />
              </div>
  )
}

export default InputComponent