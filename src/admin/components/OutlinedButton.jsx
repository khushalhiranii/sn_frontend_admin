import React from 'react'

function OutlinedButton({className, onClick, label}) {
  return (
    <button className={`cursor-pointer py-[12px] px-[24px] border border-solid border-foundation-red-normal text-foundation-red-normal bg-white rounded-lg flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred ${className}`}
    onClick={onClick}
    >
          <div className="relative text-base font-medium font-roboto text-left inline-block">
            {label}
          </div>
        </button>
  )
}

export default OutlinedButton