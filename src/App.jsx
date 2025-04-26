import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./pages/landingpage/HomePages";
import AdminLogin from "./pages/admin/AdminLogin";
import DashboardPages from "./pages/admin/dashboard/DashboardPages";
import AdminTipsPages from "./pages/admin/tips/AdminTipsPages";
import AdminAddNew from "./pages/admin/tips/AdminAddNew";
import AdminTipsEdit from "./pages/admin/tips/AdminTipsEdit";
import AdminTutorialPages from "./pages/admin/tutorial/AdminTutorialPages";
import AdminAddTutorial from "./pages/admin/tutorial/AdminAddTutorial";
import AdminEditTutorial from "./pages/admin/tutorial/AdminEditTutorial";
import CompTest from "./test/CompTest";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* user  */}
          <Route path="/" element={<HomePages />} />
          {/* Admin */}
          <Route path="/admin/login/pages" element={<AdminLogin />} />
          <Route path="/admin/dashboard/pages" element={<DashboardPages />} />
          <Route path="/admin/tips/pages" element={<AdminTipsPages />} />
          <Route path="/admin/add/new/tips" element={<AdminAddNew />} />
          <Route path="/admin/tips/edit/:Tips_Id" element={<AdminTipsEdit />} />

          <Route
            path="/admin/tutorial/pages"
            element={<AdminTutorialPages />}
          />
          <Route
            path="/admin/add/new/tutorial"
            element={<AdminAddTutorial />}
          />
          <Route
            path="/admin/tutorial/edit/:Tutor_Id"
            element={<AdminEditTutorial />}
          />
          {/* Test */}
          <Route path="/test" element={<CompTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
