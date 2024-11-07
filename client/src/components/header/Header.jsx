import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import {
  FaHome,
  FaInfoCircle,
  FaUserCircle,
  FaPlusCircle,
  FaSignInAlt,
} from "react-icons/fa";

const Header = ({ isAuth }) => {
  return (
    <>
      <header className="z-[8] fixed h-[68px] w-full flex flex-col items-center md:flex-row md:justify-between p-5 shadow-md bg-[#a222ec] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        {/* Navigation desktop */}
        <Logo />
        <div className="hidden md:flex gap-8">
          <Link
            to="/"
            className="text-[#fb0707] hover:text-purple-600 transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-[#fb0707] hover:text-purple-600 transition"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-[#fb0707] hover:text-purple-600 transition"
          >
            About
          </Link>
          {isAuth ? (
            <Link
              to="/account"
              className="text-[#fb0707] hover:text-purple-600 transition"
            >
              Account
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-[#fb0707] hover:text-purple-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Bottom Tab */}
      <div className="z-[8] fixed bottom-0 left-0 w-full bg-white shadow-t p-3 flex justify-around md:hidden">
        <Link to="/" className="text-gray-800 hover:text-purple-600 transition">
          <FaHome />
        </Link>
        <Link
          to="/courses"
          className="text-gray-800 hover:text-purple-600 transition"
        >
          <FaPlusCircle />
        </Link>
        <Link
          to="/about"
          className="text-gray-800 hover:text-purple-600 transition"
        >
          <FaInfoCircle />
        </Link>
        {isAuth ? (
          <Link
            to="/account"
            className="text-gray-800 hover:text-purple-600 transition"
          >
            <FaUserCircle />
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-gray-800 hover:text-purple-600 transition"
          >
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
