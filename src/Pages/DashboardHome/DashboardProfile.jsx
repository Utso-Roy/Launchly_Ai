import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';

const DashboardProfile = () => {
    const { user } = useContext(AuthContext);
    
     const { data: userRole = {} } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users/${user.email}`);
      return res.json();
    },
     });
    
    console.log(userRole?.role)
    
  const isAdmin = userRole?.role === "admin";
  const moderator = userRole?.role === "moderator";

  return (
    <div className="dark:bg-gray-950 min-h-screen p-4 md:p-8">
      {/* Profile Heading */}
      <h2
        className="text-3xl font-bold text-center text-[#21BEDA] dark:text-white mb-8"
        data-aos="zoom-in-down"
        data-aos-duration="2000"
      >
        My Profile
      </h2>

      {/* Profile Content */}
          <div
       data-aos="zoom-in-down"
        data-aos-duration="2000"        className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900  shadow-[#a5d8e1] p-6 rounded-lg shadow-lg">
        {/* Profile Image */}
        <div className="flex justify-center items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/ZVGf7Vn/user.png"}
            alt="User"
            className="w-36 h-36 object-cover rounded-full border-2 border-[#21BEDA] shadow"
          />
        </div>

        {/* User Info */}
        <div className="space-y-2">
                  <div>
                      <h3 className="text-[#1D2A9D] my-2 flex items-center gap-1">
        {isAdmin && <><MdOutlineAdminPanelSettings className="text-xl" /> <span className="hidden md:inline">Admin User</span></>}
        {moderator && <><FaUserShield className="text-xl" /> <span className="hidden md:inline">Moderator User</span></>}
      </h3>
            <p className="text-sm text-[#1D2A9D] dark:text-gray-400">Name</p>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              {user?.displayName || "User Name"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-[#1D2A9D] dark:text-gray-400">Email</p>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              {user?.email || "user@example.com"}
            </h3>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
