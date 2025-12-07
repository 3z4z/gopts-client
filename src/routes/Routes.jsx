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
import AllProductsAdmin from "../pages/Dashboard/Admin/AllProducts/AllProducts";
import ProductDetailsPage from "../pages/Private/ProductDetails/ProductDetails";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";

export const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/products",
        Component: AllProductsPage,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetailsPage />
          </PrivateRoute>
        ),
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
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProductsAdmin />
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
