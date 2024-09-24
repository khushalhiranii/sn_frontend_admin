import PropTypes from "prop-types";
import React, { useState } from "react";
import CustomInput from "../../user/DesignSystem/CustomInput";
import Bell from "../assets/bell";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminSocket } from "../context/AdminSocketContext";
import User from "../assets/user";

const Header = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const { users } = useAdminSocket();
  // const users = {
  //   0: { Name: "Khushal" },
  //   1: { Name: "Harsh" },
  //   2: { Name: "Vaibhav" },
  // };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    if (searchValue === "") {
      setSearchResults([]); // Clear results if input is empty
      return;
    }

    const filteredUsers = Object.values(users).filter((user) =>
      user.Name.toLowerCase().includes(searchValue)
    );

    if (filteredUsers.length > 0) {
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([{ message: "No user exists with such name" }]);
    }
  };

  return (
    <header className="self-stretch shadow-md bg-white flex items-center justify-between py-[1rem] px-[4rem] top-[0] z-20 sticky gap-[1.25rem] max-w-full">
      <div className="flex flex-row items-center gap-[0.75rem]">
        <img className="h-[3rem] w-[3rem]" loading="lazy" alt="Logo" src="/sn.svg" />
        <a className="text-[24px] font-medium font-roboto">Subandhan Nidhi</a>
      </div>

      <div className="relative w-[26.75rem] flex items-center gap-[1rem]">
        <div className="relative flex flex-col">
          <CustomInput
            placeholder="Search"
            iconSrc="/search.svg"
            onChange={(e) => handleSearch(e)}
            className="p-[14px]"
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <ul
              className="absolute top-[3rem] left-0 w-full text-[16px] font-roboto bg-white border border-gray-300 rounded-lg shadow-lg z-[9999] max-h-[200px] overflow-y-auto"
              style={{ width: "85%" }} // Match width with input
            >
              {searchResults[0]?.message ? (
                <li className="text-red-500">{searchResults[0].message}</li>
              ) : (
                searchResults.map((user, index) => (
                  <li key={index} onClick={()=> navigate(`/admin/cusmgmt/${user.Identifier}`)} className="py-1 px-2 text-gray-800 cursor-pointer">
                    {user.Name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <NavLink
          to="/admin/notifications"
          className={({ isActive }) =>
            `text-foundation-blue-normal flex flex-row items-center justify-center p-[14px] gap-[12px] border-[2px] border-solid border-foundation-white-normal-hover rounded ${
              isActive
                ? "bg-foundation-blue-normal text-white"
                : "hover:bg-foundation-blue-normal hover:text-white"
            }`
          }
        >
          <Bell />
        </NavLink>
        <NavLink
          to="/admin/AdminInfo"
          className={({ isActive }) =>
            `text-foundation-blue-normal flex flex-row items-center justify-center p-[14px] gap-[12px] border-[2px] border-solid border-foundation-white-normal-hover rounded ${
              isActive
                ? "bg-foundation-blue-normal text-white"
                : "hover:bg-foundation-blue-normal hover:text-white"
            }`
          }
        >
          <User />
        </NavLink>
      
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
