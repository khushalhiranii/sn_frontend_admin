import React from "react";
import { Outlet } from "react-router-dom"; // Assuming you are using React Router for routing
import Header from "../../admin/components/header";
import NavbarAgent from "./NavbarAgent";

const LayoutAgent = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row w-full font-roboto">
        <NavbarAgent/>
        <Outlet/>
          {/* <NavbarAdmin /> */}
            
          {/* <Outlet/> This will render the matched child route */}

      </div>
    </div>
  );
};

export default LayoutAgent;
