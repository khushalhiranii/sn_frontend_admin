import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <img
          src="/menu-symbol.svg" // Replace with your three dots icon path
          alt="Menu"
          className="h-[20px] w-[20px]"
        />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <Link to="/" className="block px-4 py-2 text-black hover:bg-gray-200">Home</Link>
          <Link to="/schemes" className="block px-4 py-2 text-black hover:bg-gray-200">Schemes</Link>
          <Link to="/loans" className="block px-4 py-2 text-black hover:bg-gray-200">Loans</Link>
          <Link to="/saving-account" className="block px-4 py-2 text-black hover:bg-gray-200">Saving Account</Link>
          <Link to="/contact" className="block px-4 py-2 text-black hover:bg-gray-200">Contact Us</Link>
          {/* <Link to="/search" className="block px-4 py-2 text-black hover:bg-gray-200">Search</Link>
          <Link to="/notifications" className="block px-4 py-2 text-black hover:bg-gray-200">Notifications</Link>
          <Link to="/user" className="block px-4 py-2 text-black hover:bg-gray-200">User</Link> */}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
