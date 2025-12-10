import { Link } from "react-router";
import useRole from "../hooks/useRole";
import { useAuthStore } from "../stores/useAuthStore";
import useUserStatus from "../hooks/useUserStatus";
import AccessDeniedComponent from "../pages/Dashboard/Common/AccessDenied/AccessDenied";

export default function AdminOrManagerRoute({ children }) {
  const { role, isLoading } = useRole();
  const { status, isLoading: isStatusLoading } = useUserStatus();
  const { isSigningIn } = useAuthStore();
  if (isSigningIn || isLoading || isStatusLoading) return <p>Loading...</p>;
  if (
    (role.role.toLowerCase() === "manager" && status?.status !== "pending") ||
    role.role.toLowerCase() === "admin"
  )
    return children;
  else {
    return <AccessDeniedComponent />;
  }
}
