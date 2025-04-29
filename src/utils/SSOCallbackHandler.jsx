import { useEffect } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SSOCallbackHandler = () => {
  const { userId } = useAuth();
  const { redirectToSignUp } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      // User is signed in, redirect to homepage
      navigate("/drivix/user/homepage");
    } else {
      // User not found, redirect to signup
      redirectToSignUp({ redirectUrl: "/user/signUp/pages" });
    }
  }, [userId]);

  return <p className="text-white">Processing SSO callback...</p>;
};

export default SSOCallbackHandler;
