import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import Setting from "./Setting.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/:configName",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
