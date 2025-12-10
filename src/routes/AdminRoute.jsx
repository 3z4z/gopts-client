import { Link } from "react-router";
import useRole from "../hooks/useRole";
import { useAuthStore } from "../stores/useAuthStore";
import QueryLoader from "../components/Common/Loaders/QueryLoader";

export default function AdminRoute({ children }) {
  const { role, isLoading } = useRole();
  const { isSigningIn } = useAuthStore();
  if (isSigningIn || isLoading) return <QueryLoader />;
  if (
    role.role.toLowerCase() === "admin" ||
    role.role.toLowerCase() === "super admin"
  )
    return children;
  else {
    return (
      <div>
        <p>Access Denied</p>
        <div className="flex gap-2 mt-4">
          <Link to={-1} className="btn btn-primary">
            Go Back
          </Link>
        </div>
      </div>
    );
  }
}
