import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { VITE_GOOGLE_CLIENT_ID } from "./constants/environment.js";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </>
);
