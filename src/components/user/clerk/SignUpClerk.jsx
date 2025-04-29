import React from "react";
import { SignUp } from "@clerk/react-router";
const SignUpClerk = () => {
  return (
    <section className="text-white h-screen w-full flex justify-center items-center">
      <div>
        <SignUp
          path="/user/signUp/pages"
          routing="path"
          signInUrl="/user/login/pages"
          afterSignUpUrl="/user/login/pages"
        />
      </div>
    </section>
  );
};

export default SignUpClerk;
