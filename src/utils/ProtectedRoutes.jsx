import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/user/login/pages" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
