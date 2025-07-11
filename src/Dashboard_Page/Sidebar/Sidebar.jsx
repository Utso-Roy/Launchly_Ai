import React from 'react';
import { NavLink } from 'react-router';
import { 
  FaUserCircle, FaPlusCircle, FaThList, 
  FaChartBar, FaUsersCog, FaTicketAlt 
} from 'react-icons/fa';
import { MdDashboard, MdOutlineRateReview, MdReport } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="w-full sticky md:top-16 sm:top-12 md:w-64 bg-white dark:bg-gray-900 shadow-lg h-full p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#21BEDA] flex gap-1 items-center dark:text-white mb-6">
        <MdDashboard /> Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FaThList />
          My Products
        </NavLink>

        {/* New Links Start */}

        <NavLink
          to="/dashboard/reviewQueue"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <MdReport />
          Reported Contents
        </NavLink>

        <NavLink
          to="/dashboard/statistics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'text-[#21BEDA]'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FaTicketAlt />
          Manage Coupons
        </NavLink>

        {/* New Links End */}
      </nav>
    </div>
  );
};

export default Sidebar;
