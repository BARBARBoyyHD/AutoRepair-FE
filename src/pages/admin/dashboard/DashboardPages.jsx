import React, { useState } from "react";
import SideBar from "../../../components/admin/sidebar/SideBar";
import SidebarToggle from "../../../components/admin/button/SidebarToggle";

const DashboardPages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex flex-col">
         <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <SidebarToggle isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      <section  className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}>
        <div className="text-white h-screen flex justify-center items-center flex-col">
            <h1 className="font-bold text-3xl ">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">This is the place where you can manage your content for My Service</p>
            <p className="text-gray-600">Click the sidebar button to see all the menu</p>
        </div>
      </section>
    </main>
  );
};

export default DashboardPages;
