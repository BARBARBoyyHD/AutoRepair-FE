import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import LoadingSpinner from "../components/user/loading/LoadingSpinner";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    ); // Or a spinner
  }

  if (!isSignedIn) {
    return <Navigate to="/user/login/pages" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
