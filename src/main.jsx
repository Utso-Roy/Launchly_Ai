import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes/Routes";
import AuthProvider from "./AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />
          <ToastContainer />
    </AuthProvider>



  </StrictMode>
);
