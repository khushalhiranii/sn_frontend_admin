import PropTypes from "prop-types";
import React from "react";

const Header = () => {
  return (
    <header
      className="self-stretch shadow-[0px_1px_4px_-1px_rgba(0,_0,_0,_0.15)] bg-white overflow-auto shrink-0 flex flex-row items-center justify-between py-[1rem] px-[4rem] box-border top-[0] z-[99] sticky gap-[1.25rem] max-w-full text-left text-[1.5rem] text-black font-roboto mq850:pl-[2rem] mq850:pr-[2rem] mq850:box-border"
    >
      <div className="flex flex-row items-center justify-start gap-[0.75rem]">
        <img
          className="h-[3rem] w-[4rem] relative object-cover"
          loading="lazy"
          alt="Subandhan nidhi"
          src="/src/assets/sn.png"
        />
        <a className="[text-decoration:none] relative font-medium text-[inherit] whitespace-nowrap">
          Subandhan nidhi
        </a>
      </div>
      <div className="w-[26.75rem] flex flex-row items-center justify-center gap-[1rem] max-w-full text-[1.125rem] text-foundation-blue-normal">
        <div className="flex-1 rounded flex flex-row items-center justify-start py-[0.687rem] px-[0.625rem] gap-[0.75rem] border-[2px] border-solid border-darkslategray-100">
          <img
            className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0"
            alt="Search"
            src="/search.svg"
          />
          <a className="[text-decoration:none] flex-1 relative text-[inherit]">
            Search
          </a>
        </div>
        <div className="w-[3rem] rounded box-border flex flex-row items-center justify-center py-[0.687rem] px-[0.75rem] border-[2px] border-solid border-darkslategray-100">
          <img
            className="h-[1.25rem] w-[1.25rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt="Notifications"
            src="/bell.svg"
          />
        </div>
        <div className="w-[3rem] rounded box-border flex flex-row items-center justify-center py-[0.687rem] px-[0.75rem] border-[2px] border-solid border-darkslategray-100">
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
