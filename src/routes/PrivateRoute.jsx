import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import PageLoader from "../components/Common/Loaders/PageLoader";

export default function PrivateRoute({ children }) {
  const { user, isAuthLoading } = useAuthStore();
  const { pathname } = useLocation();
  if (isAuthLoading) return <PageLoader />;
  return !user ? (
    <Navigate state={pathname || "/"} to={"/auth/login"} />
  ) : (
    children
  );
}
