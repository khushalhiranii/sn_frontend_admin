import PropTypes from "prop-types";
import Disloan from "../../admin/assets/dis-loan";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom
import "./navbar.css"
import HeaderNavLink from "../DesignSystem/HeaderNavlink";
import CustomInputWithIcon from "../DesignSystem/CustomInput";
import CustomInput from "../DesignSystem/CustomInput";
import DropdownMenu from "../DesignSystem/Dropdown";
const FrameComponent = ({ className = "" }) => {
  const navigate = useNavigate();
  const user = () => {
    navigate("/login");
  }
  return (
    <header
      className={`fixed w-full self-stretch shadow-[0px_1px_4px_-1px_rgba(0,_0,_0,_0.15)] bg-white flex flex-row items-center justify-between py-[16px] px-[64px] box-border top-[0] z-[99] max-w-full text-left text-[1.5rem] text-black font-roboto mq1275:pl-[2rem] mq1275:pr-[2rem] mq1275:box-border ${className}`}>
      <div className="flex flex-row items-center justify-start gap-[12px]">
        <img
          className="h-[48px] w-[48px] relative object-cover"
          loading="lazy"
          alt=""
          src="/sn.svg"
        />
        <div className="[text-decoration:none] relative font-medium text-2xl whitespace-nowrap">
          Subandhan Nidhi
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-[16px] max-w-full text-[1.125rem] mq1275:hidden">
        <HeaderNavLink to="/" label={"Home"} />
        <HeaderNavLink to="/schemes" label={"Schemes"} img={true} />
        <HeaderNavLink to="/loans" label={"Loans"} img={true} />
        <HeaderNavLink to="/saving-account" label={"Saving Account"} img={true} />
        <HeaderNavLink to="/contact" label={"Contact Us"} />
        <CustomInput placeholder="Search" iconSrc="/search.svg" />
        <div className="rounded box-border flex flex-row items-center justify-center border-[2px] border-solid border-foundation-white-normal-hover">
          <img
            className="h-[20px] w-[20px] px-[14px] py-[14px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/notification.svg"
          />
        </div>
        <div onClick={user} className="rounded box-border flex flex-row items-center justify-center border-[2px] border-solid border-foundation-white-normal-hover">
          <img
            className="h-[20px] w-[20px] px-[14px] py-[14px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/user.svg"
          />
        </div>
      </div>

      {/* Three Dots Dropdown for Small Screens */}
      <div className="hidden mq1275:flex">
        <DropdownMenu />
      </div>
    </header>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
