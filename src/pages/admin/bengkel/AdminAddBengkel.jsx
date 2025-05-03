import React, { useState } from "react";
import SidebarToggle from "../../../components/admin/button/SidebarToggle";
import AddNewBengkel from "../../../components/admin/form/AddNewBengkel";
import SideBar from "../../../components/admin/sidebar/SideBar";
const AdminAddBengkel = () => {
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
          <AddNewBengkel />
        </div>
      </section>
    </main>
  );
};

export default AdminAddBengkel;
