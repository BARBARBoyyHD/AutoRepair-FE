  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import { CLERK_SECRET } from "./config/ClerkSecret.js";
  import { ClerkProvider } from "@clerk/clerk-react";
  import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
  import "./index.css";
  import App from "./App.jsx";

  const PUBLISHABLE_KEY = CLERK_SECRET;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
        publishableKey={PUBLISHABLE_KEY}
        navigate={(to) => window.history.pushState(null, '', to)}
        afterSignOutUrl={"/user/login/pages"}
        
      >
        <App />
      </ClerkProvider>
    </StrictMode>
  );
