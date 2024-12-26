import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { MdImageSearch } from "react-icons/md";
import { Link } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-indigo-600 w-100 flex justify-between items-center">
        <div
          className={`container max-w-[1200px] p-4 md:p-6 lg:p-8 mx-auto transition ease-in-out duration-300 ${
            isOpen ? "mb-[15rem]" : "mb-0"
          }`}
        >
          <nav className="md:flex justify-between items-center mx-auto  tracking-tight">
            <div className="hidden md:block">
              <h1 className="font-heading text-gray-100 text-3xl font-bold text-center ">
                <Link to="/">OGallery</Link>
              </h1>
            </div>
            <div className="hidden md:flex justify-between items-center space-x-2 font-sans font-medium text-md">
              <form className="flex items-center justify-between relative">
                <input
                  type="search"
                  placeholder="Search an image"
                  className="rounded-md  p-2 h-[2.5rem] w-full text-gray-900 outline-indigo-600 bg-gray-100"
                />
                <button type="submit">
                  <MdImageSearch className="text-blue-500 p-2 rounded-md text-[3rem] absolute right-0 top-[-5px]" />
                </button>
              </form>
              <ul className="flex justfy-between items-center space-x-2">
                <li className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3">
                  My images
                </li>
                <li className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3">
                  <Link to="/profile">My profile</Link>
                </li>
                <li className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-blue-300 border-2 border-blue-300 rounded-md py-2 px-3">
                  <Link to="/Signup">Sign up</Link>
                </li>
              </ul>
            </div>
            {/* Mobile view */}
            <div className="md:hidden flex justify-between items-center">
              <h1 className="font-bold text-3xl text-gray-300">OGallery</h1>
              {isOpen ? (
                <IoClose
                  className="text-3xl text-gray-200"
                  onClick={() => setIsOpen(false)}
                />
              ) : (
                <RxHamburgerMenu
                  className="text-3xl text-gray-200"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
            <div
              className={`md:hidden absolute top--5 left-0 w-full bg-indigo-600 p-6 transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-y-0 z-10" : "-translate-y-full z-[-10]"
              }`}
            >
              <form className="flex items-center justify-between relative mx-8 my-4">
                <input
                  type="search"
                  placeholder="Search an image"
                  className="rounded-md  p-2 h-[2.5rem] w-full text-gray-900 outline-indigo-600 bg-gray-100"
                />
                <button type="submit">
                  <MdImageSearch className="text-blue-500 p-2 rounded-md text-[3rem] absolute right-0 top-[-5px]" />
                </button>
              </form>
              <div className="flex flex-col space-y-4 text-center">
                <a className="text-gray-100 font-medium text-xl" href="#">
                  My Images
                </a>
                <a className="text-gray-100 font-medium text-xl" href="#">
                  My profile
                </a>
                <a className="text-gray-100 font-medium text-xl" href="#">
                  Login
                </a>
                <a className="text-gray-100 font-medium text-xl" href="#">
                  Sign up
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
