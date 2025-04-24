import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./pages/landingpage/HomePages";
import AdminLogin from "./pages/admin/AdminLogin";
import DashboardPages from "./pages/admin/dashboard/DashboardPages";
import AdminTipsPages from "./pages/admin/tips/AdminTipsPages";
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
          <Route path="/admin/dashboard/pages" element={<DashboardPages/>}/>
          <Route path="/admin/tips/pages" element={<AdminTipsPages/>}/>
          {/* Test */}
          <Route path="/test" element={<CompTest/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
