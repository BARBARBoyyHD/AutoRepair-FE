import React, { useState } from "react";
import SidebarToggle from "../../../components/admin/button/SidebarToggle";
import AddNewTutorial from "../../../components/admin/form/AddNewTutorial";
import SideBar from "../../../components/admin/sidebar/SideBar";
const AdminAddTutorial = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex flex-col">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <SidebarToggle isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <section
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div>
          <AddNewTutorial />
        </div>
      </section>
    </main>
  );
};

export default AdminAddTutorial;
