import { NavLink } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import { headerNavLinks } from "../../../utils/navLinks";
import MainLogoComponent from "../MainLogo/MainLogo";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";

export default function DrawerNavbarComponent() {
  const { isUserReady } = useAuthStore();
  return (
    <div className="menu bg-base-200 min-h-full w-80 p-4">
      <div className="flex justify-between">
        <MainLogoComponent
          mainColor={"text-primary"}
          subColor={"text-secondary"}
        />
        <label
          htmlFor="navbar"
          className="h-auto p-2 btn bg-base-300 drawer-overlay"
          aria-label="close sidebar"
        >
          <MdClose className="w-5 h-5" />
        </label>
      </div>
      <ul className="mt-10">
        {headerNavLinks
          .filter((link) => !link.isPrivate || link.isPrivate === isUserReady)
          .map((link, index) => {
            return (
              <li key={index} className="mb-2 last:mb-0">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-primary/15 font-bold"
                        : " hover:bg-primary/7 text-neutral"
                    } px-5 py-2 transition-all rounded-full text-sm`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
