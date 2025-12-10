import { Link } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import UserLoadingSpinnerLoader from "../Loaders/UserLoadingSpinner";
import { toggleTheme } from "../../../utils/toggleTheme";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function DashboardHeader() {
  const { user, isAuthLoading } = useAuthStore();
  const [themeState, setThemeState] = useState("light");
  const htmlElement = document.documentElement;
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
  }, [htmlElement]);
  return (
    <div className="px-4 flex max-sm:justify-end justify-between items-center flex-1">
      <h5 className="max-sm:hidden">
        Garments Orders & Production Tracking System
      </h5>
      <div className="flex">
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
        <div>
          <button
            onClick={() => toggleTheme(themeState, setThemeState, htmlElement)}
            className="ms-3 btn btn-ghost rounded-full p-2.5 h-auto w-auto text-lg"
          >
            {themeState === "dark" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </div>
  );
}
