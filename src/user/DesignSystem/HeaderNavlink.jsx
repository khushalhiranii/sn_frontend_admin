import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNavLink = ({ to, label, className = '', img }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded flex flex-row items-center justify-start py-[12px] px-[12px] gap-[12px] ${isActive ? "active-toplink" : "toplink"} ${className}`
      }
    >
      <span className="relative font-medium text-lg inline-block whitespace-nowrap">
        {label}
      </span>
      {img && <img className='w-[20px] h-[20px]' src='arrow-down.svg'/>}
    </NavLink>
  );
};

export default HeaderNavLink;
