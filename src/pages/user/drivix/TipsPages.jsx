import React, { useEffect, useState } from "react";
import BengkelComp from "../../../components/user/drivix/Bengkel/BengkelComp";
import NavbarUser from "../../../components/user/navbar/NavbarUser";
import NavbarUserMobile from "../../../components/user/navbar/NavbarUserMobile";
import Section2 from "../../../components/user/drivix/Section2";
const TipsPages = () => {
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
        <NavbarUserMobile isOpen={isOpen} handleOpen={handleOpen} />
      ) : (
        <NavbarUser /> // Desktop navbar
      )}
      <div>
        <Section2 />
      </div>
    </main>
  );
};

export default TipsPages;
