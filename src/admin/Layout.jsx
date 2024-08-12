import React from "react";
import Header from "./components/header";
import NavbarAdmin from "./components/navbar-admin";
import { Outlet } from "react-router-dom"; // Assuming you are using React Router for routing

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-[70%]">
        <NavbarAdmin/>
        <Outlet/>
          {/* <NavbarAdmin /> */}
            
          {/* <Outlet/> This will render the matched child route */}

      </div>
    </div>
  );
};

export default Layout;
