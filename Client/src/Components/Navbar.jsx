import React from "react";
import { FaCamera } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="container flex justify-between items-center p-4 mx-auto">
      <div className="flex justify-between text-purple-600 gap-2">
        <FaCamera className="text-3xl" />
        <h1 className="text-2xl font-bold">Ogallery</h1>
      </div>
      <ul className="flex items-center gap-8 text-gray-700">
        <li>Explore</li>
        <li>Features</li>
        <li>About</li>
        <li className="text-purple-700">Login</li>
        <li className="bg-purple-700 text-white px-3 py-1 rounded-md border-purple-700">
          Signup
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
