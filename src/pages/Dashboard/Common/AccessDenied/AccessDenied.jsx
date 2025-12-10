import { Link, useLocation } from "react-router";
import { container } from "../../../../utils/classNames";

export default function AccessDeniedComponent() {
  const { pathname } = useLocation();
  return (
    <div
      className={pathname.includes("/book-product") ? `mt-32 ${container}` : ""}
    >
      <div className="py-10 bg-base-200 rounded-xl flex flex-col items-center px-3">
        <p className="text-center">
          Access to this page is restricted. Check your profile for details.
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            to={"/dashboard/my-profile"}
            className="btn btn-primary px-6 rounded-full"
          >
            Go to profile
          </Link>
        </div>
      </div>
    </div>
  );
}
