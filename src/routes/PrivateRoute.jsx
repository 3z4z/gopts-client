import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function PrivateRoute({ children }) {
  const { user, isAuthLoading } = useAuthStore();
  const { pathname } = useLocation();
  if (isAuthLoading) return <p>Loading...</p>;
  return !user ? (
    <Navigate state={pathname || "/"} to={"/auth/login"} />
  ) : (
    children
  );
}
