import { createBrowserRouter, Navigate } from "react-router";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        index: true,
        element: <Navigate to={"login"} replace />,
      },
    ],
  },
]);
