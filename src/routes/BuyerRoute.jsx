import { Link } from "react-router";
import useRole from "../hooks/useRole";
import { useAuthStore } from "../stores/useAuthStore";
import useUserStatus from "../hooks/useUserStatus";
import AccessDeniedComponent from "../pages/Dashboard/Common/AccessDenied/AccessDenied";
import QueryLoader from "../components/Common/Loaders/QueryLoader";

export default function BuyerRoute({ children }) {
  const { role, isLoading } = useRole();
  const { status, isLoading: isStatusLoading } = useUserStatus();
  const { isSigningIn } = useAuthStore();
  if (isSigningIn || isLoading || isStatusLoading) return <QueryLoader />;
  if (role.role.toLowerCase() === "buyer" && status?.status !== "pending")
    return children;
  else {
    return <AccessDeniedComponent />;
  }
}
