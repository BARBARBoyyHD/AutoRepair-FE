import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/navbar/Navbar"; // Desktop Navbar
import NavbarMobile from "../../components/user/navbar/NavbarMobile"; // Mobile Navbar
import { Link } from "react-router-dom";

const HomePages = () => {
  const [isMobile, setIsMobile] = useState(false); // State to track if it's mobile view
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu

  const handleMobileScreen = () => {
    setIsMobile(window.innerWidth < 1128); // Update the state based on window width
  };

  const handleOpen = () => {
    setIsOpen(!isOpen); // Toggle mobile menu open/close
  };

  useEffect(() => {
    window.addEventListener("resize", handleMobileScreen); // Event listener for resizing
    handleMobileScreen(); // Set initial state on mount
    return () => {
      window.removeEventListener("resize", handleMobileScreen); // Clean up on unmount
    };
  }, []);

  return (
    <main>
      {/* Render mobile navbar for small screens */}
      {isMobile ? (
        <NavbarMobile isOpen={isOpen} handleOpen={handleOpen} />
      ) : (
        <Navbar /> // Desktop navbar
      )}

      <section className="h-[100vh] flex items-center justify-center bg-HomePage bg-cover bg-no-repeat bg-center w-full text-white flex-col">
        <div>
          <h1 className="text-3xl font-bold underline">Section 1</h1>
        </div>
        <Link to={"/dashboard"}>Go to dashboard</Link>
      </section>

      <section className="h-[100vh] flex items-center justify-center bg-gray-800 text-white">
        <h1 className="text-3xl font-bold underline">Section 2</h1>
      </section>
    </main>
  );
};

export default HomePages;
