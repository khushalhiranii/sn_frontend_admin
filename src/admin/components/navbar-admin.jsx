import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import IconHome from '../assets/home-1.jsx';
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
import { useAuth } from "../context/AuthContext.jsx";
import { useAdminSocket } from "../context/AdminSocketContext.jsx";


const NavLinkItem = ({ to, icon: Icon, label, onClick, count }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => isActive ? "navlink active-navlink" : "navlink"}
  >
    <div className="flex flex-row justify-start gap-[12px]">
      <Icon />
      {label}
    </div>
    {count && <div >
      ({count})
    </div>}
  </NavLink>
);

NavLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const NavbarAdmin = () => {
  const  { requests, loans, schemes, accounts, userData, users } = useAdminSocket();
  const schemesArray = Object.values(schemes);
  const accountsArray = Object.values(accounts);
  const pendingSchemes = schemesArray.filter((scheme)=> scheme.Status === "Pending")
  const approvedSchemes = schemesArray.filter((scheme)=> scheme.Status !== "Pending")
  const pendingAccounts = accountsArray.filter((account)=> account.Status === "Pending")

  return (
    <div className="flex flex-col w-[20%] border-solid border-[#E6E6E6] border-r-[1px] !sticky top-16 left-0 bg-white items-start justify-between pb-12 py-[16px] pl-16 gap-[16px] text-left text-[14px] font-medium text-black font-roboto">
      <div className="flex flex-col items-start justify-start w-[110%] gap-y-[16px] text-left text-[1.125rem] text-black font-roboto">
        <NavLinkItem to="/admin/dashboard" icon={IconHome} label="Dashboard" />
        <NavLinkItem to="/admin/loanRequest" icon={Loan} label="Loan Request" count={Object.values(requests).length} />
        <NavLinkItem to="/admin/scheme" icon={Scheme} label="Scheme Request" count={pendingSchemes.length} />
        <NavLinkItem to="/admin/loanInfo" icon={Disloan} label="Loan Info" count={Object.values(loans).length} />
        <NavLinkItem to="/admin/schemeInfo" icon={Dueloan} label="Scheme Info" count={approvedSchemes.length} />
        <NavLinkItem to="/admin/savingAccount" icon={Savacc} label="Saving Account" count={pendingAccounts.length} />
        <NavLinkItem to="/admin/cusmgmt" icon={Cusmng} label="Customer Management" />
        <NavLinkItem to="/admin/agmgmt" icon={Agmng} label="Agent Management" />
        <NavLinkItem to="/admin/repogen" icon={Repogen} label="Report Generation" />
      </div>
      <div className="flex flex-col items-start justify-start w-[110%] text-left text-[1.125rem] text-black font-roboto">
        <NavLinkItem to="/admin" icon={Signout} label="Sign Out" onClick={()=> sessionStorage.clear()} />
      </div>
    </div>
  );
};

NavbarAdmin.propTypes = {
  className: PropTypes.string,
};

export default NavbarAdmin;
