import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp, IoCarSportOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates, MdWorkspacesOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-slate-900 text-white shadow-lg transition-transform duration-300 rounded-r-[16px] z-50 ${
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-700">
        <h2 className="text-lg font-semibold"><Link to={"/admin/dashboard/pages"}>Drivix Admin</Link></h2>
        <button onClick={() => setIsOpen(false)} className="text-white">
          ✖
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="mt-4 space-y-2">
        <Link to="/admin/tips/pages">
          <SidebarItem
            icon={<MdOutlineTipsAndUpdates size={20} />}
            text="Tips and Trick"
          />
        </Link>
        <Link to="/admin/tutorial">
          <SidebarItem icon={<IoCarSportOutline size={20} />} text="Tutorial" />
        </Link>
        <Link to="/admin/bengkel">
          <SidebarItem
            icon={<FaScrewdriverWrench size={20} />}
            text="Bengkel"
          />
        </Link>
        <Link to="/admin/projects">
          <SidebarItem
            icon={<MdWorkspacesOutline size={20} />}
            text="Projects"
          />
        </Link>
      </ul>
    </div>
  );
};

// SidebarItem as a <div> inside <Link> for safe clickable layout
const SidebarItem = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-800 p-3 rounded-lg">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default Sidebar;
