import { NavLink } from "react-router";
import { headerNavLinks } from "../../../utils/navLinks";
import { useAuthStore } from "../../../stores/useAuthStore";

export default function NavbarComponent() {
  const { isUserReady } = useAuthStore();
  console.log("isUserReady", isUserReady);

  return (
    <nav className="flex items-center gap-1">
      {headerNavLinks
        .filter((link) => !link.isPrivate || link.isPrivate === isUserReady)
        .map((link, index) => {
          return (
            <NavLink
              key={index}
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
          );
        })}
    </nav>
  );
}
