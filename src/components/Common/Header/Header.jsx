import { useEffect, useState } from "react";
import NavbarComponent from "../Navbar/Navbar";

import { FiMoon, FiSun } from "react-icons/fi";
import MainLogoComponent from "../MainLogo/MainLogo";
import { Link } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import { userDdLinks } from "../../../utils/navLinks";
import { BiExit } from "react-icons/bi";

export default function HeaderComponent() {
  const { user, isAuthLoading, signOut } = useAuthStore();
  const [themeState, setThemeState] = useState("light");
  const htmlElement = document.documentElement;

  const toggleTheme = () => {
    const updateTheme = themeState === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-theme", updateTheme);
    setThemeState(updateTheme);
    localStorage.setItem("theme", updateTheme);
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(storedTheme);
      htmlElement.setAttribute("data-theme", storedTheme);
    } else {
      setThemeState("light");
      htmlElement.setAttribute("data-theme", "light");
    }
  }, []);
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <header className="flex justify-between gap-4 px-3 py-4 items-center bg-[rgba(255,255,255,0.01)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.9px] border-b border-b-neutral/10 fixed top-0 left-0 w-full z-10">
      <MainLogoComponent
        mainColor={"text-primary"}
        subColor={"text-secondary"}
      />
      <div className="flex items-center gap-8">
        <NavbarComponent />
        {isAuthLoading ? (
          <div className="loading loading-spinner"></div>
        ) : !user ? (
          <div className="flex gap-2">
            <Link
              to={"/auth/login"}
              className="btn btn-primary rounded-full px-5 btn-outline"
            >
              Login
            </Link>
            <Link
              to={"/auth/register"}
              className="btn btn-primary rounded-full px-5"
            >
              Register
            </Link>
            <button
              onClick={toggleTheme}
              className="btn btn-ghost rounded-full p-2.5 h-auto w-auto text-lg"
            >
              {themeState === "dark" ? <FiMoon /> : <FiSun />}
            </button>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-11 h-11 p-0 border border-primary ring-4 ring-primary/20 rounded-full overflow-hidden cursor-pointer"
            >
              <figure>
                <img src={user.photoURL} alt="" />
              </figure>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-64 p-2 shadow-sm"
            >
              <div className="rounded-lg bg-primary/10 px-4 py-4 mb-3">
                <p className="text-lg font-semibold text-center">
                  Welcome back!
                </p>
                <p className="text-center mb-2 px-3 text-primary font-bold">
                  {user?.displayName}
                </p>
              </div>
              {userDdLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>
                    <link.icon />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="font-normal! text-error"
                  onClick={handleLogOut}
                >
                  <BiExit className="rotate-180" />
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
