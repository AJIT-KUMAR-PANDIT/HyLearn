import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import "./index.css";

export const server = `${import.meta.env.VITE_SERVER}`;
// "https://hylearn.onrender.com";

export const frontend = `${import.meta.env.VITE_FRONTEND}`;
// "https://hylearn.vercel.app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
