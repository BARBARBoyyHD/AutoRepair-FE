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
import LoginPages from "./pages/user/login/LoginPages";
import SignUpPages from "./pages/user/login/SignUpPages";
import HomePagesUser from "./pages/user/drivix/HomPagesUser";
import TutorialPages from "./pages/user/drivix/TutorialPages";
import SingleTutorial from "./pages/user/drivix/SingleTutorial";
import BengkelPages from "./pages/user/drivix/BengkelPages";
import TipsSingle from "./pages/user/drivix/TipsSingle";
import SSOCallbackHandler from "./utils/SSOCallbackHandler";
import ProtectedRoute from "./utils/ProtectedRoutes";
import CompTest from "./test/CompTest";

function App() {
  return (
    <div className="bg-HomePage min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />} />
          {/* user  */}

          <Route path="/user/login/pages" element={<LoginPages />} />
          <Route path="/user/signUp/pages" element={<SignUpPages />} />
          <Route
            path="/user/login/pages/sso-callback"
            element={<SSOCallbackHandler />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/drivix/user/homepage" element={<HomePagesUser />} />
            <Route path="/drivix/tutorial/pages" element={<TutorialPages />} />
            <Route
              path="/drivix/single/tutorial/:Tutor_Id"
              element={<SingleTutorial />}
            />
            <Route path="/drivix/bengkel/terdekat" element={<BengkelPages />} />
            <Route
              path="/drivix/single/tips/:Tips_Id"
              element={<TipsSingle />}
            />
          </Route>

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
