import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Importing hamburger icon from react-icons
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/logo.svg";

export default function NavbarMobile({ isOpen, handleOpen }) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center text-black py-4 px-2 md:px-32 bg-black drop-shadow-md">
      <Link to={""} className="flex items-center gap-3">
        <img src={logo} className="w-10 h-10" alt="" />

        <h1 className="font-semibold text-white">Drivix</h1>
      </Link>

      {/* Mobile menu icon */}
      <div className="cursor-pointer text-white" onClick={handleOpen}>
        <div
          className={`text-3xl transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <IoClose className="cursor-pointer" />
          ) : (
            <FaBars className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-20 left-0 w-full bg-black text-white flex flex-col items-center gap-2 font-semibold transform transition-transform ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li className="hover:text-sky-500 transition-all duration-300">
          <Link to={"/drivix/user/homepage"}>Home</Link>
        </li>
        <li className="hover:text-sky-500 transition-all duration-300">
          <Link to={"/drivix/bengkel/terdekat"}>Bengkel Terdekat</Link>
        </li>
        <li className="hover:text-sky-500 transition-all duration-300">
          <Link to={"/drivix/tutorial/pages"}>Tutorial</Link>
        </li>
      </div>
    </header>
  );
}
