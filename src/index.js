import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Overview from "./routes/Overview";
import Patients from "./routes/Patients";
import Appointment from "./routes/Appointment";
import Dummy from "./routes/Dummy";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/reports" element={<Reports />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "calender",
        element: <Appointment />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "messages",
        element: <Dummy />,
      },
      {
        path: "support",
        element: <Dummy />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
