import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/navbar/Navbar"; // Desktop Navbar
import NavbarMobile from "../../components/user/navbar/NavbarMobile"; // Mobile Navbar
import Section1 from "../../components/homepage/Section1";
import Section2 from "../../components/homepage/Section2";
import Footer from "../../components/footer/Footer";
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

      <Section1 />
      <Section2 />
      <Footer />
    </main>
  );
};

export default HomePages;
