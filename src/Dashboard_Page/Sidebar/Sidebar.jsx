import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaUserCircle, FaPlusCircle, FaThList, FaChartBar, FaUsersCog, FaTicketAlt, FaUserShield, FaUserAlt } from "react-icons/fa";
import { MdDashboard, MdOutlineAdminPanelSettings, MdOutlineRateReview, MdReport } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
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

  const menuItems = [
    isUser && { icon: <FaUserCircle />, label: "My Profile", to: "/dashboard/profile" },
    isUser && { icon: <FaPlusCircle />, label: "Add Product", to: "/dashboard/addProduct" },
    isUser && { icon: <FaThList />, label: "My Products", to: "/dashboard/myProducts" },

    moderator && { icon: <MdOutlineRateReview />, label: "Review Queue", to: "/dashboard/reviewQueue" },
    moderator && { icon: <MdReport />, label: "Reported Contents", to: "/dashboard/reportedContents" },

    isAdmin && { icon: <FaChartBar />, label: "Statistics", to: "/dashboard/statistics" },
    isAdmin && { icon: <FaUsersCog />, label: "Manage Users", to: "/dashboard/manageUsers" },
    isAdmin && { icon: <FaTicketAlt />, label: "Manage Coupons", to: "/dashboard/manageCoupons" },
  ].filter(Boolean);

  return (
    <div className="w-full sticky md:top-18 sm:top-12 md:w-64 bg-white dark:bg-gray-900 shadow-lg h-full p-4 space-y-4 transition-all duration-300">
      <h2 className="text-2xl font-bold text-center text-[#21BEDA] flex gap-1 items-center dark:text-white mb-6">
        <MdDashboard /> <span className="hidden md:inline">Dashboard</span>
      </h2>

     

    

      <nav className="flex flex-col gap-3">
        <NavLink
  to="/dashboard/dashboardProfile"
  className={({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive
        ? "text-[#21BEDA]"
        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    }`
  }
>
  <ImProfile className="text-xl" />
  <span className="hidden md:inline">Profile</span>
</NavLink>

        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "text-[#21BEDA]"
                  : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <Link to="/login">
          <button className="flex items-center justify-center md:justify-start mx-4 hover:text-red-700 gap-2 cursor-pointer">
            <FiLogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
