import { Link } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import UserLoadingSpinnerLoader from "../Loaders/UserLoadingSpinner";

export default function DashboardHeader() {
  const { user, isAuthLoading } = useAuthStore();

  return (
    <div className="px-4 flex justify-end flex-1">
      {isAuthLoading ? (
        <UserLoadingSpinnerLoader />
      ) : (
        <Link
          to={"/dashboard/my-profile"}
          className="w-11 h-11 p-0 border border-primary ring-4 ring-primary/20 rounded-full overflow-hidden"
        >
          <figure>
            <img src={user.photoURL} alt="" />
          </figure>
        </Link>
      )}
    </div>
  );
}
