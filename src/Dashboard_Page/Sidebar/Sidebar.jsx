import React from 'react';
import { NavLink } from 'react-router';
import { FaUserCircle, FaPlusCircle, FaThList } from 'react-icons/fa';

const Sidebar = () => {



  return (
    <div className="w-full sticky top-18 md:w-64 bg-white dark:bg-gray-900 shadow-lg h-full p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#21BEDA] dark:text-white mb-6">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? 'bg-[#21BEDA] text-white'
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
                ? 'bg-[#21BEDA] text-white'
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
                ? 'bg-[#21BEDA] text-white'
                : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FaThList />
          My Products
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
