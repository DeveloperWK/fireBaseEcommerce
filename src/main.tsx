import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
import "./index.css";
import router from "./Router/Router.tsx";
import store from "./store/reduxStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </AuthProvider>
 </StrictMode>
);
