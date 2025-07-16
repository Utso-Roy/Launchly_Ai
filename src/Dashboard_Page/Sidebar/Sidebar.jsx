import React, { useContext } from "react";
import { NavLink } from "react-router";
import {
  FaUserCircle,
  FaPlusCircle,
  FaThList,
  FaChartBar,
  FaUsersCog,
  FaTicketAlt,
  FaUserShield,
  FaUserAlt,
} from "react-icons/fa";
import { MdDashboard, MdOutlineAdminPanelSettings, MdOutlineRateReview, MdReport } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const { data: userRole = {} } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users/${user.email}`);
      return res.json();
    },
  });


  const isAdmin = userRole?.role === "admin";
  const isUser = userRole?.role === "user";
  const moderator = userRole?.role === "moderator";

  return (
    <div className="w-full sticky md:top-16 sm:top-12 md:w-64 bg-white dark:bg-gray-900 shadow-lg h-full p-4 space-y-4">
      <h2 className="text-2xl  font-bold text-center text-[#21BEDA] flex gap-1 items-center dark:text-white mb-6">
        <MdDashboard />  Dashboard   
      
       
      </h2>
<h3 className="text-[#23245F] font-semibold flex items-center gap-2">
  {isAdmin && (
    <>
      <MdOutlineAdminPanelSettings className="text-xl" />
      Admin User
    </>
  )}
  {moderator && (
    <>
      <FaUserShield className="text-xl" />
      Moderator User
    </>
  )}
  {isUser && (
    <>
      <FaUserAlt className="text-xl" />
      Regular User
    </>
  )}
</h3>

      <nav className="flex flex-col gap-3">
        {isUser && (
          <>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaUserCircle />
              My Profile
            </NavLink>

            <NavLink
              to="/dashboard/addProduct"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaPlusCircle />
              Add Product
            </NavLink>

            <NavLink
              to="/dashboard/myProducts"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaThList />
              My Products
            </NavLink>
          </>
        )}

        {moderator && (
          <>
            <NavLink
              to="/dashboard/reviewQueue"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <MdOutlineRateReview />
              Review Queue
            </NavLink>

            <NavLink
              to="/dashboard/reportedContents"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <MdReport />
              Reported Contents
            </NavLink>
          </>
        )}

        {isAdmin && (
          <>
            <NavLink
              to="/dashboard/statistics"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaChartBar />
              Statistics
            </NavLink>

            <NavLink
              to="/dashboard/manageUsers"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaUsersCog />
              Manage Users
            </NavLink>

            <NavLink
              to="/dashboard/manageCoupons"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-[#21BEDA]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaTicketAlt />
              Manage Coupons
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
