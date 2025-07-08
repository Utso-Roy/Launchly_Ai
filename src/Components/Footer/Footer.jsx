import React from 'react';
import { Link, NavLink } from 'react-router';

const Footer = () => {

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
    <footer className="bg-[#101960] dark:bg-[#1e2939]  text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* Logo / Name */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Launchly</h2>
          <p className="text-sm text-gray-300">
            Discover and share the latest tech products.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            {navLinks}
           
            <li>
              <Link to="/contact" className="hover:text-[#21BEDA] transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <button className="bg-[#21BEDA] cursor-pointer hover:bg-cyan-400 transition text-white px-4  py-2 rounded-lg text-sm">
            Subscribe Now
          </button>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-gray-700 pt-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Launchly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
