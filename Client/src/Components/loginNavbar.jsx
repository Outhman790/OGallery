import React, { useState } from "react";
import { MdImageSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
function LoginNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <nav className="bg-indigo-600 w-full z-20">
      <div className="container max-w-[1200px] mx-auto p-4 flex items-center justify-between relative">
        {/* Logo Centered (on mobile too) */}
        <Link
          to="/"
          className="text-3xl font-bold text-gray-100 flex items-center gap-2 mx-auto md:mx-0"
        >
          OGallery
        </Link>

        {/* Hamburger toggle */}
        <button
          className="md:hidden absolute right-4 text-3xl text-gray-100"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <IoClose /> : <RxHamburgerMenu />}
        </button>

        {/* Nav content (one structure only, responsive) */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full md:static md:w-auto md:flex md:items-center md:gap-6 bg-indigo-600 md:bg-transparent p-4 md:p-0`}
        >
          {/* Search Bar */}
          <form className="relative w-full md:w-[250px] mb-4 md:mb-0">
            <input
              type="search"
              placeholder="Search an image"
              className="rounded-md p-2 h-[2.5rem] w-full text-gray-900 outline-indigo-600 bg-gray-100"
            />
            <button type="submit" aria-label="Search">
              <MdImageSearch className="text-blue-500 p-2 rounded-md text-[3rem] absolute right-0 top-[-5px]" />
            </button>
          </form>

          {/* Links */}
          <ul className="flex flex-col md:flex-row gap-4 md:gap-3 text-white font-medium md:items-center items-center text-center">
            <li>
              <Link
                to="/myprofile"
                className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3 hover:bg-blue-300 hover:text-indigo-600"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/myaccount"
                className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3 hover:bg-blue-300 hover:text-indigo-600"
              >
                My Account
              </Link>
            </li>{" "}
            <li>
              <button
                className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3 hover:bg-blue-300 hover:text-indigo-600"
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LoginNavbar;
