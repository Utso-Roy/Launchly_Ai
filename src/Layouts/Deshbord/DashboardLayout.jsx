import React from "react";
import Sidebar from "../../Dashboard_Page/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex md:gap-5 sm:gap-3">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
