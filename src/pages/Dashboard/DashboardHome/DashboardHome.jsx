import QueryLoader from "../../../components/Common/Loaders/QueryLoader";
import useRole from "../../../hooks/useRole";
import { useAuthStore } from "../../../stores/useAuthStore";
import AdminDbHome from "./AdminDbHome";

export default function DashboardHomePage() {
  const { user, isCookieReady } = useAuthStore();
  const { role, isLoading: isRoleLoading } = useRole();
  if (isRoleLoading || !isCookieReady) return <QueryLoader />;
  return (
    <>
      <h5 className="mb-4 text-xl">Hello, {user?.displayName}!</h5>
      <title>Dashboard | GOPTS</title>
      {(() => {
        switch (role.role.toLowerCase()) {
          case "admin":
            return <AdminDbHome />;
          default:
            return <p>Welcome to the GOPTS Dashboard</p>;
        }
      })()}
    </>
  );
}
