import React from "react";
import Sidebar from "../../Dashboard_Page/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FcIdea } from "react-icons/fc";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex md:gap-5 sm:gap-3">
        <Sidebar></Sidebar>

        <div className="p-8">
      <h1 className="text-3xl font-bold text-[#2D7FC4] text-center mb-4"> Welcome to Your Dashboard</h1>
      <p className="text-lg text-center text-gray-600">
        Use the sidebar to navigate through your dashboard tools and features.
      </p>

      <div className="flex justify-center mt-6">
        <FcIdea className="text-7xl" />
      </div>
    </div>
    
        <div>

          
        <Outlet></Outlet>
        </div>
      </div>

      
    </div>
  );
};

export default DashboardLayout;
