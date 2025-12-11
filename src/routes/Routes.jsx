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
import AdminOrManagerRoute from "./AdminOrManagerRoute";
import ProductBookingPage from "../pages/Private/ProductBooking/ProductBooking";
import MyOrdersPage from "../pages/Dashboard/Buyer/MyOrders/MyOrders";
import PaymentSuccessPage from "../pages/Dashboard/Buyer/Payments/PaymentSuccess";
import PaymentFailedPage from "../pages/Dashboard/Buyer/Payments/PaymentFailed";
import BuyerRoute from "./BuyerRoute";
import OrderDetailsPage from "../pages/Dashboard/Buyer/OrderDetails/OrderDetails";
import AllOrdersPage from "../pages/Dashboard/Admin/AllOrders/AllOrders";
import PendingOrdersPage from "../pages/Dashboard/Manager/PendingOrders/PendingOrders";
import ApprovedOrdersPage from "../pages/Dashboard/Manager/ApprovedOrders/ApprovedOrders";
import MyProfilePage from "../pages/Dashboard/Common/MyProfile/MyProfile";
import ErrorPage from "../pages/Error/Error";
import AboutUsPage from "../pages/AboutUs/AboutUs";
import FAQPage from "../pages/FAQ/FAQ";
import PrivacyPolicyPage from "../components/Home/PrivacyPolicy/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
        path: "/about-us",
        Component: AboutUsPage,
      },
      {
        path: "/faq",
        Component: FAQPage,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicyPage,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-product/:id",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <ProductBookingPage />
            </BuyerRoute>
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
      {
        path: "my-profile",
        Component: MyProfilePage,
      },
      // Buyer routes
      {
        path: "my-orders",
        element: (
          <BuyerRoute>
            <MyOrdersPage />
          </BuyerRoute>
        ),
      },
      {
        path: "my-orders/:id",
        element: (
          <BuyerRoute>
            <OrderDetailsPage />
          </BuyerRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <BuyerRoute>
            <PaymentSuccessPage />
          </BuyerRoute>
        ),
      },
      {
        path: "payment-failed",
        element: (
          <BuyerRoute>
            <PaymentFailedPage />
          </BuyerRoute>
        ),
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
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrdersPage />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders/:id",
        element: (
          <AdminRoute>
            <OrderDetailsPage />
          </AdminRoute>
        ),
      },
      // admin + manager routes
      {
        path: "edit-product/:id",
        element: (
          <AdminOrManagerRoute>
            <EditProductPage />
          </AdminOrManagerRoute>
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
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrdersPage />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApprovedOrdersPage />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders/:id",
        element: (
          <ManagerRoute>
            <OrderDetailsPage />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-orders/:id",
        element: (
          <ManagerRoute>
            <OrderDetailsPage />
          </ManagerRoute>
        ),
      },
    ],
  },
]);
