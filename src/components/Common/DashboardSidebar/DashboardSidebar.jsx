import { Link, NavLink } from "react-router";
import { dashboardSidebarLinks } from "../../../utils/navLinks";
import { GiBigGear } from "react-icons/gi";
import useRole from "../../../hooks/useRole";
import AuthSpinnerLoader from "../Loaders/AuthSpinner";
import { RiCloseCircleFill } from "react-icons/ri";

export default function DashboardSidebar({ isSidebarOpen }) {
  const { isLoading, role } = useRole();
  return (
    <ul className="menu w-full grow relative">
      <li className="max-lg:block hidden absolute top-0 left-full">
        <label
          htmlFor="dashboard"
          aria-label="close sidebar"
          className="btn h-auto p-2 shadow-none bg-base-300 rounded-l-none border-none"
        >
          <RiCloseCircleFill className="text-primary w-6 h-6" />
        </label>
      </li>
      <li
        className={
          isSidebarOpen &
          "bg-base-300 border border-primary/15 mb-3 transition-all"
        }
      >
        <Link
          className="py-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
          to={"/"}
          data-tip="GOPTS - Home"
        >
          <GiBigGear
            className={`${isSidebarOpen ? "size-5" : "size-4"} transition-all`}
          />
          <h3 className="text-lg is-drawer-close:hidden text-nowrap">GOPTS</h3>
        </Link>
      </li>
      {/* List item */}
      {isLoading ? (
        <div className="flex justify-center">
          <AuthSpinnerLoader />
        </div>
      ) : (
        dashboardSidebarLinks
          .filter(
            (link) => !link.access || link.access === role.role.toLowerCase()
          )
          .map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-primary/10 font-bold" : ""
                  } is-drawer-close:tooltip is-drawer-close:tooltip-right`
                }
                data-tip={link.title}
              >
                <link.icon className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden text-nowrap">
                  {link.title}
                </span>
              </NavLink>
            </li>
          ))
      )}
    </ul>
  );
}
