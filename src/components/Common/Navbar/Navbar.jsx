import { NavLink } from "react-router";
import { headerNavLinks } from "../../../utils/navLinks";

export default function NavbarComponent() {
  return (
    <nav className="flex items-center gap-1">
      {headerNavLinks.map((link, index) => {
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
