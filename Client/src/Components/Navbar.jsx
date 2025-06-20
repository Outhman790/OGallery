import React, { useState, forwardRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = forwardRef(({ scrollTo }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      ref={ref}
      className={window.location.pathname !== '/' ? 'h-[4rem] bg-purple-100' : 'bg-white'}
    >
      <div className="container flex justify-between items-center p-4 md:p-0 mx-auto">
        <Link to="/">
          <div className="absolute inset-0 z-10 p-4 text-center w-full h-fit md:w-auto md:static flex justify-center items-center gap-1 md:m-0 md:p-0 text-purple-600 cursor-pointer">
            <FaCamera className="text-3xl" />
            <h1 className="text-2xl font-bold">Ogallery</h1>
          </div>
        </Link>

        <GiHamburgerMenu
          className="text-3xl cursor-pointer md:hidden absolute top-5 right-5 z-20"
          onClick={toggleMenu}
        />

        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:gap-8 text-gray-700 absolute md:static inset-0 bg-stone-50 md:bg-transparent h-fit p-5 mt-16 md:m-0`}
        >
          <li className="w-fit mx-auto p-1 md:p-0">
            <Link to="/gallery">Explore</Link>
          </li>
          <li className="w-fit mx-auto p-1 md:p-0" onClick={() => scrollTo('section1')}>
            <button>Features</button>
          </li>
          <li className="w-fit mx-auto p-1 md:p-0" onClick={() => scrollTo('section2')}>
            <button>Trending now</button>
          </li>
          <li className="w-fit mx-auto p-1 md:p-0">
            <Link to="/login">Login</Link>
          </li>
          <li className="w-fit mx-auto">
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
