import React from "react";
import { BiMenu, BiX } from "react-icons/bi";


const SidebarToggle = ({ isOpen, setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="p-3 text-white transition-transform duration-300"
    >
      {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
    </button>
  );
};

export default SidebarToggle;
