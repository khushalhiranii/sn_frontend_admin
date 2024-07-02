import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import IconHome from '../assets/home-1.jsx'; // Assuming IconHome is a React component defined in this file
import Loan from "../assets/loan.jsx";
import Scheme from "../assets/scheme.jsx";
import Disloan from "../assets/dis-loan.jsx";
import Dueloan from "../assets/due-loan.jsx";
import Savacc from "../assets/sav-acc.jsx";
import Cusmng from "../assets/cus-mng.jsx";
import Agmng from "../assets/ag-mng.jsx";
import Repogen from "../assets/repo-gen.jsx";
import Signout from "../assets/signout.jsx";
import './navbar.css';

const NavbarAdmin = () => {
  
  
  return (
    <div className="flex flex-col w-72 !sticky overflow-auto top-16 left-0 h-full bg-white items-start justify-start pb-12 py-4 pr-0 pl-16 gap-2 text-left text-[1.125rem] text-black font-roboto mq450:pl-5 mq450:box-border mq675:pt-5 mq675:pb-5 mq675:box-border">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <IconHome className="h-[1rem] w-[1rem] relative shrink-0" />
          Dashboard
      </NavLink>
      <NavLink to="/loanRequest" className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Loan />
        {/* <div className="relative font-medium inline-block min-w-[6.938rem]"> */}
          Loan Request
        {/* </div> */}
      </NavLink>
      <NavLink to="/scheme" className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Scheme />
        {/* <div className="relative font-medium"> */}
          Scheme Request
          {/* </div> */}
      </NavLink>
      <NavLink to="loanInfo" className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Disloan />
        {/* <div className="relative font-medium inline-block min-w-[7.875rem]"> */}
          Loan Info
        {/* </div> */}
      </NavLink>
      <NavLink to="schemeInfo" className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Dueloan />
        {/* <div className="relative font-medium inline-block min-w-[4.75rem]"> */}
          Scheme Info
        {/* </div> */}
      </NavLink>
      <NavLink to="/savingAccount" className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Savacc />
        {/* <div className="relative text-[1.125rem] font-medium font-roboto text-foundation-blue-normal text-left inline-block min-w-[7.875rem]"> */}
          Saving Account
        {/* </div> */}
      </NavLink>
      <NavLink to='cusmgmt' className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Cusmng />
        {/* <div className="relative font-medium"> */}
        Customer Management
        {/* </div> */}
      </NavLink>
      <NavLink to='agmgmt' className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Agmng />
        {/* <div className="relative font-medium"> */}
          Agent Management
          {/* </div> */}
      </NavLink>
      <NavLink to='repogen' className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}>
        <Repogen />
        {/* <div className="relative font-medium"> */}
          Report Generation
          {/* </div> */}
      </NavLink>
      

      <div className="self-stretch flex flex-col items- justify-start py-[2rem] px-[0rem]">
        <div className="rounded-tl rounded-tr-none rounded-br-none rounded-bl bg-darkslategray-200 flex flex-row items-center justify-start py-[0.718rem] pr-[8.687rem] pl-[0.75rem] gap-[0.75rem] whitespace-nowrap">
          <Signout />
          <div className="relative font-medium inline-block min-w-[4.313rem]">
            Sign Out
          </div>
        </div>
      </div>
    </div>
    
  );
};

NavbarAdmin.propTypes = {
  className: PropTypes.string,
};

export default NavbarAdmin;
