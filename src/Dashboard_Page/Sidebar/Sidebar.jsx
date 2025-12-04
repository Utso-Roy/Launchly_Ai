import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
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
import {
  MdDashboard,
  MdOutlineAdminPanelSettings,
  MdOutlineRateReview,
  MdReport,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: userRole = {} } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `https://launchly-server-side.vercel.app/users/${user.email}`
      );
      return res.json();
    },
  });

  const isAdmin = userRole?.role === "admin";
  const isUser = userRole?.role === "user";
  const moderator = userRole?.role === "moderator";

  // Role badge
  const getRoleBadge = () => {
    if (isAdmin) return { text: "Admin", color: "bg-red-500", icon: <MdOutlineAdminPanelSettings /> };
    if (moderator) return { text: "Moderator", color: "bg-blue-500", icon: <FaUserShield /> };
    if (isUser) return { text: "User", color: "bg-green-500", icon: <FaUserAlt /> };
    return { text: "Guest", color: "bg-gray-500", icon: <FaUserCircle /> };
  };

  const roleBadge = getRoleBadge();

  const menuSections = [
    {
      title: "User Menu",
      show: isUser,
      items: [
        {
          icon: <ImProfile />,
          label: "My Profile",
          to: "/dashboard/dashboardProfile",
        },
        {
          icon: <FaPlusCircle />,
          label: "Add Product",
          to: "/dashboard/addProduct",
        },
        {
          icon: <FaThList />,
          label: "My Products",
          to: "/dashboard/myProducts",
        },
      ],
    },
    {
      title: "Moderator",
      show: moderator,
      items: [
        {
          icon: <MdOutlineRateReview />,
          label: "Review Queue",
          to: "/dashboard/reviewQueue",
        },
        {
          icon: <MdReport />,
          label: "Reported Contents",
          to: "/dashboard/reportedContents",
        },
      ],
    },
    {
      title: "Administration",
      show: isAdmin,
      items: [
        {
          icon: <FaChartBar />,
          label: "Statistics",
          to: "/dashboard/statistics",
        },
        {
          icon: <FaUsersCog />,
          label: "Manage Users",
          to: "/dashboard/manageUsers",
        },
        {
          icon: <FaTicketAlt />,
          label: "Manage Coupons",
          to: "/dashboard/manageCoupons",
        },
      ],
    },
  ];

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-[#21BEDA] to-[#101960] dark:from-yellow-400 dark:to-yellow-600 p-2.5 rounded-xl shadow-lg">
            <MdDashboard className="text-white dark:text-gray-900 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Control Panel</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-br from-[#21BEDA]/10 to-[#101960]/10 dark:from-yellow-400/10 dark:to-yellow-600/10 rounded-xl p-4 border border-[#21BEDA]/20 dark:border-yellow-400/20">
          <div className="flex items-center gap-3 mb-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-[#21BEDA] dark:border-yellow-400 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <FaUserCircle className="text-gray-600 dark:text-gray-400 text-2xl" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`${roleBadge.color} px-3 py-1 rounded-full flex items-center gap-1.5`}>
              <span className="text-white text-xs">{roleBadge.icon}</span>
              <span className="text-white text-xs font-semibold">{roleBadge.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-6">
          {menuSections
            .filter((section) => section.show)
            .map((section, idx) => (
              <div key={idx}>
                <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <NavLink
                      key={itemIdx}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? "bg-[#21BEDA] dark:from-yellow-400 dark:to-yellow-600 text-white dark:text-gray-900 shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`text-lg ${isActive ? "" : "group-hover:scale-110 transition-transform"}`}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <Link to="/login">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 font-medium group">
            <FiLogOut className="text-lg group-hover:translate-x-[-4px] transition-transform" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#21BEDA] dark:bg-yellow-400 text-white dark:text-gray-900 p-3 rounded-xl shadow-lg"
      >
        {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-80 h-screen
          bg-white dark:bg-gray-900 
          shadow-2xl
          flex flex-col
          transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;