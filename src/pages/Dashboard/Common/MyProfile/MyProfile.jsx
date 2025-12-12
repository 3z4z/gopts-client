import { BiExit } from "react-icons/bi";
import useRole from "../../../../hooks/useRole";
import { useAuthStore } from "../../../../stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import dayjs from "dayjs";
import QueryLoader from "../../../../components/Common/Loaders/QueryLoader";

export default function MyProfilePage() {
  const { role } = useRole();
  const axios = useAxios();
  const { user, signOut } = useAuthStore();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/email/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const handleLogout = async () => {
    await signOut();
  };

  if (isLoading) return <QueryLoader />;
  return (
    <>
      <h4 className="text-3xl font-semibold mb-6">My Profile</h4>
      <title>My Profile | GOPTS</title>
      <div className="md:py-8 sm:py-5 py-2 bg-base-200 rounded-2xl p-4">
        <div className="max-w-4xl mx-auto bg-base-100 py-10 px-6 rounded-xl border border-base-300 shadow-lg">
          <div className="grid sm:grid-cols-4 max-sm:gap-8 items-center">
            <figure className="rounded-full overflow-hidden max-w-38 aspect-square w-full mx-auto ring-4 ring-primary/20 border-4 border-base-300">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="max-sm:text-center sm:pl-8 sm:col-span-3">
              <p className="text-3xl font-extrabold text-primary mb-2 leading-tight">
                {user?.displayName || "User Name"}
              </p>
              <p className="mb-1">
                <span className="me-1.5 text-neutral/70">Email:</span>
                <span className="font-semibold">{user?.email}</span>
              </p>
              <p className="mb-1">
                <span className="me-1.5 text-neutral/70">Member since:</span>
                <span className="font-semibold">
                  {dayjs(userInfo?.createdAt).format("DD MMMM, YYYY")}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-neutral/70 me-1.5">Account Status:</span>
                <span
                  className={`font-semibold capitalize ${
                    userInfo.status === "rejected"
                      ? "text-error"
                      : userInfo.status === "pending"
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  {userInfo.status}
                </span>
              </p>
              <div
                className={`badge badge-lg font-bold px-4 ${
                  role?.role === "Admin"
                    ? "badge-primary"
                    : role?.role === "Manager"
                    ? "badge-secondary"
                    : "badge-neutral"
                }`}
              >
                {role?.role}
              </div>
            </div>
          </div>
          {userInfo.status === "rejected" && (
            <div className="mt-10 pt-6 border-t border-base-300">
              <h5 className="text-xl font-bold text-error mb-3">
                Reason: {userInfo?.rejectionReason.title || "N/A"}
              </h5>
              <div className="bg-error/10 p-4 rounded-lg border border-error/50">
                <p className="text-error leading-relaxed">
                  {userInfo?.rejectionReason.body || "N/A"}
                </p>
              </div>
            </div>
          )}
          {userInfo.status === "pending" && (
            <div className="mt-10 pt-6 border-t border-base-300">
              <div className="bg-warning/10 p-4 rounded-lg border border-warning/50 text-center">
                <p className="text-warning leading-relaxed">
                  Your account is on pending approval. <br /> An admin will
                  review and approve your application. Then you can access all
                  the features.
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-center mt-10 pt-8 border-t border-base-300">
            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline rounded-full px-8"
            >
              <BiExit className="rotate-180 text-xl" />
              <span className="font-semibold">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
