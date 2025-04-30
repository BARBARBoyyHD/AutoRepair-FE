import React from "react";
import { SignIn, useClerk } from "@clerk/react-router";

const LoginClerk = () => {
  const { redirectToSignUp } = useClerk();

  const handleSignInError = (error) => {
    const errorCode = error?.errors?.[0]?.code;
    if (errorCode === "form_identifier_not_found") {
      redirectToSignUp(); // if user not found, redirect to SignUp page
    }
  };

  return (
    <section className="text-white h-screen w-full flex justify-center items-center">
      <div>
        <SignIn
          path="/user/login/pages"
          routing="path"
          signUpUrl="/user/signUp/pages"
          redirectUrl="/drivix/user/homepage"
          afterSignInUrl="/drivix/user/homepage"
          signInFallback={handleSignInError} 
        />
      </div>
    </section>
  );
};

export default LoginClerk;
