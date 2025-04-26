import React, { useState } from "react";
import SidebarToggle from "../../../components/admin/button/SidebarToggle";
import SideBar from "../../../components/admin/sidebar/SideBar";
import AdminTutorialList from "../../../components/admin/tutorial/AdminTutorialList";
const AdminTutorialPages = () => {
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
          <AdminTutorialList />
        </div>
      </section>
    </main>
  );
};

export default AdminTutorialPages;
