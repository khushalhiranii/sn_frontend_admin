import React from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css';
// import { useAuth } from "../context/AuthContext.jsx";
import IconHome from "../../admin/assets/home-1.jsx";
import Repogen from "../../admin/assets/repo-gen.jsx";
import Signout from "../../admin/assets/signout.jsx";
import OverDue from "../assets/OverDue.jsx";
import Pending from "../assets/Pending.jsx";
import Agmng from "../../admin/assets/ag-mng.jsx";
import Time from "../../admin/assets/time.jsx";


const NavLinkItem = ({ to, icon: Icon, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? "navlink active-navlink" : "navlink"
    }
    onClick={(e) => {
      if (onClick) {
        e.preventDefault(); // Prevent immediate navigation
        onClick(); // Execute the custom onClick logic
      }
    }}
  >
    <Icon />
    {label}
  </NavLink>
);

NavLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Make onClick optional
};

const ActionItem = ({ icon: Icon, label, onClick, count }) => (
  <button
    onClick={onClick}
    className="flex flex-row flex-nowrap items-center justify-between px-3 py-3 gap-3 rounded-tl-md rounded-bl-md w-[91%] text-inherit no-underline transition-colors duration-300 ease-in-out border-r-0 border-solid border-transparent box-border bg-white hover:text-[rgb(69,69,231)]"
  >
    <div className="flex flex-row justify-start gap-[12px] font-roboto font-medium">
      <Icon />
      {label}
    </div>
    {count && <div >
      ({count})
    </div>}
  </button>
);

ActionItem.propTypes = {
  // to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const NavbarAgent = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/agent");
  };


  return (
    <div className="flex flex-col w-[20%] border-solid border-[#E6E6E6] border-r-[1px] !sticky top-16 left-0 bg-white items-start justify-between pb-12 py-[16px] pl-16 gap-[16px] text-left text-[14px] font-medium text-black font-roboto">
      <div className="flex flex-col items-start justify-start w-[110%] gap-y-[16px] text-left text-[1.125rem] text-black font-roboto">
        <NavLinkItem to="/agent/home" icon={IconHome} label="Home" />
        <NavLinkItem to="/agent/due" icon={OverDue} label="Customer Over Due" />
        <NavLinkItem to="/agent/pending" icon={Pending} label="Pendings" />
        <NavLinkItem to="/agent/history" icon={Time} label="History" />
      </div>
      <div className="flex flex-col items-start justify-start w-[110%] text-left text-[1.125rem] text-black font-roboto">
      <ActionItem icon={Signout} label="Sign Out" onClick={handleSignOut} />
      </div>
    </div>
  );
};

NavbarAgent.propTypes = {
  className: PropTypes.string,
};

export default NavbarAgent;
