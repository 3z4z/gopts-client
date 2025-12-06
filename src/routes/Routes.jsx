import { createBrowserRouter, Navigate } from "react-router";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/Dashboard";
import DashboardHomePage from "../pages/Dashboard/DashboardHome/DashboardHome";
import ManageUsersPage from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import AddProductPage from "../pages/Dashboard/Manager/AddProduct/AddProduct";
import ManageProductsPage from "../pages/Dashboard/Common/ManageProducts/ManageProducts";
import EditProductPage from "../pages/Dashboard/Manager/EditProduct/EditProduct";

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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"home"} />,
      },
      {
        path: "home",
        Component: DashboardHomePage,
      },
      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsersPage />
          </AdminRoute>
        ),
      },
      // manager routes
      {
        path: "manage-products",
        element: (
          <ManagerRoute>
            <ManageProductsPage />
          </ManagerRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ManagerRoute>
            <AddProductPage />
          </ManagerRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <ManagerRoute>
            <EditProductPage />
          </ManagerRoute>
        ),
      },
    ],
  },
]);
