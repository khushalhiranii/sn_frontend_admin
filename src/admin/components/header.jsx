import PropTypes from "prop-types";
import React from "react";
import CustomInput from "../../user/DesignSystem/CustomInput";
import Bell from "../assets/bell";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="self-stretch shadow-[0px_1px_4px_-1px_rgba(0,_0,_0,_0.15)] bg-white overflow-auto shrink-0 flex flex-row items-center justify-between py-[1rem] px-[4rem] box-border top-[0] z-[99] sticky gap-[1.25rem] max-w-full text-left text-[1.5rem] text-black font-roboto mq850:pl-[2rem] mq850:pr-[2rem] mq850:box-border">
      <div className="flex flex-row items-center justify-start gap-[0.75rem]">
        <img
          className="h-[3rem] w-[3rem] relative object-cover"
          loading="lazy"
          alt="Subandhan nidhi"
          src="/sn.svg"
        />
        <a className="[text-decoration:none] relative font-medium text-[24px] whitespace-nowrap">
          Subandhan Nidhi
        </a>
      </div>
      <div className="w-[26.75rem] flex flex-row items-center justify-center gap-[1rem] max-w-full text-[1.125rem] text-foundation-blue-normal">
        <CustomInput placeholder="Search" iconSrc="/search.svg" className="p-[14px]" />
        {/* Use `className` function to handle active styles */}
        <NavLink
          to="/admin/notifications"
          className={({ isActive }) =>
            `text-foundation-blue-normal flex flex-row items-center justify-center p-[14px] gap-[12px] border-[2px] border-solid border-foundation-white-normal-hover rounded ${
              isActive ? 'bg-foundation-blue-normal text-white' : 'hover:bg-foundation-blue-normal hover:text-white'
            }`
          }
        >
          <Bell />
        </NavLink>
        <div className="flex flex-row items-center justify-center p-[14px] gap-[12px] border-[2px] border-solid border-foundation-white-normal-hover rounded">
          <img
            className="h-[1.25rem] w-[1.25rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt="User Profile"
            src="/user.svg"
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
