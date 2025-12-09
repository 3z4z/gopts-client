import useRole from "../../../../hooks/useRole";
import { useAuthStore } from "../../../../stores/useAuthStore";
export default function MyProfilePage() {
  const { role } = useRole();
  const { user } = useAuthStore();
  return (
    <>
      <h4 className="text-2xl mb-4">My Profile</h4>
      <div className="md:py-10 sm:py-5 py-2 bg-base-200 rounded-xl px-2">
        <div className="max-w-3xl mx-auto bg-base-100 py-20 lg:px-10 px-2 grid sm:grid-cols-2 max-sm:gap-10 rounded-xl items-center">
          <figure className="rounded-full overflow-hidden max-w-56 aspect-square w-full mx-auto ring-10 ring-accent/20 border-6 border-primary/70">
            <img src={user?.photoURL} alt="" />
          </figure>
          <div className="max-sm:text-center">
            <p className="text-3xl font-extrabold text-primary mb-1">
              {user?.displayName}
            </p>
            <p className="mb-5 text-lg">
              <span className="text-neutral/70 me-2">Email:</span>
              {user?.email}
            </p>
            <div
              className={`badge badge-lg ${
                role?.role === "Admin"
                  ? "badge-primary"
                  : role?.role === "Manager"
                  ? "badge-secondary"
                  : "badge-neutral"
              }`}
            >
              {role.role}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
