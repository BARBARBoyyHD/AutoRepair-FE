import React, { useEffect, useState } from "react";
import Navbar from "../../../components/user/navbar/Navbar";
import NavbarMobile from "../../../components/user/navbar/NavbarMobile";
import Section1 from "../../../components/user/drivix/Section1";
import Section2 from "../../../components/user/drivix/Section2";
const HomPagesUser = () => {
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
      {isMobile ? (
        <NavbarMobile isOpen={isOpen} handleOpen={handleOpen} />
      ) : (
        <Navbar /> // Desktop navbar
      )}
      <Section1 />
      <Section2 />
    </main>
  );
};

export default HomPagesUser;
