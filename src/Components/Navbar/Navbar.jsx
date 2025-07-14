import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoIosSunny, IoMdLogOut } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import Roket from "../../assets/Roket.json";
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logOut, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handelLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Logout failed!");
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#21BEDA] font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-[#21BEDA] font-semibold" : ""
          }
        >
          Products
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar shadow-sm sticky top-0 z-1000 px-4 ${
        theme === "dark" ? "bg-[#1e2939] text-white" : "bg-[#101960] text-white"
      }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start  ">
        {/* Mobile Dropdown Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex items-center ">
          <p className="text-[1.4rem] text-[#21BEDA] font-semibold">Launchly</p>
          <div className="w-9 h-9">
            <Lottie
              animationData={Roket}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-sm bg-[#21BEDA] text-white  dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-[#21BEDA] transition"
        >
          {theme === "light" ? (
            <LuMoonStar size={20} />
          ) : (
            <IoIosSunny size={22} />
          )}
        </button>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn   btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user?.photoURL} />
              </div>
            </div>
<ul
  tabIndex={0}
  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 text-[#21BEDA] rounded-box w-52"
>
  <li className="dark:text-[#21BEDA]">
    <span>
                  
                    {user?.displayName}
    </span>
  </li>

  <li>
    <Link
      to="/dashboard"
      className="cursor-pointer  flex items-center gap-2 font-semibold transition-colors duration-200 rounded-md px-2 py-1"
    >
      <MdDashboard className="text-lg" /> Dashboard
    </Link>
  </li>

  <li>
    <button
      onClick={handelLogOut}
      className="w-full text-left flex items-center gap-2 cursor-pointer  font-semibold transition-colors duration-200 rounded-md px-2 py-1"
    >
      <IoMdLogOut className="text-lg" /> Logout
    </button>
  </li>
</ul>

          </div>
        ) : (
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#21BEDA",
                "&:hover": {
                  backgroundColor: "#1BAFC8",
                },
                color: "white",
                borderRadius: "6px",
                px: 2,
              }}
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
