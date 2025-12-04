import React from "react";
import Sidebar from "../../Dashboard_Page/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar - Fixed at top */}
      <div className=" z-30 bg-white dark:bg-gray-900 shadow-md">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar - Will scroll with content */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full my-16 p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;