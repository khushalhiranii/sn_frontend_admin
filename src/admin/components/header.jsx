import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import CustomInput from "../../user/DesignSystem/CustomInput";
import Bell from "../assets/bell";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminSocket } from "../context/AdminSocketContext";
import User from "../assets/user";

const Header = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { users } = useAdminSocket();

  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchValue(value); // Set value first
    if (!value) {
      setSearchResults([]); // Clear results if input is empty
      return;
    }

    // Filter users based on the search value
    const filteredUsers = Object.values(users).filter((user) =>
      user.Name.toLowerCase().includes(value)
    );

    // Check if any users matched or display no result message
    if (filteredUsers.length > 0) {
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([{ message: "No user exists with such name" }]);
    }
  };

  // Optionally, debounce the search function to reduce re-renders on every keypress.
  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (!searchValue) setSearchResults([]);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceSearch);
  }, [searchValue]);

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
            onChange={handleSearch} // Directly use the function here
            className="p-[14px]"
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <ul
              className="absolute top-[3rem] left-0 text-[16px] font-roboto bg-white border border-gray-300 rounded-lg shadow-lg z-[9999] max-h-[200px] overflow-y-auto w-[85%]"
            >
              {searchResults[0]?.message ? (
                <li className="text-red-500">{searchResults[0].message}</li>
              ) : (
                searchResults.map((user, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (user.Role === "User") {
                        navigate(`/admin/cusmgmt/${user.Identifier}`);
                      } else {
                        navigate(`/admin/agmgmt/${user.Identifier}`);
                      }
                      setSearchValue(""); // Clear search value after navigation
                    }}
                    className="flex flex-row justify-between py-1 px-2 font-normal list-none text-base text-gray-800 cursor-pointer hover:bg-mediumvioletred-200"
                  >
                    <div>
                      {user.Name}
                    </div>
                    <div className="text-[10px] text-[#9c99a2]">
                      {user.Role}
                    </div>
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
