import React from 'react'

function OutlinedButton({className, onClick, label, padding = "py-[12px] px-[24px]"}) {
  return (
    <button className={`cursor-pointer border border-solid ${padding} border-foundation-red-normal text-foundation-red-normal bg-white rounded flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred-200 ${className}`}
    onClick={onClick}
    >
          <div className="relative text-base font-medium font-roboto text-left inline-block">
            {label}
          </div>
        </button>
  )
}

export default OutlinedButton