import { useState } from "react";
import NavbarComponent from "../Navbar/Navbar";

import { FiMoon, FiSun } from "react-icons/fi";
import MainLogoComponent from "../MainLogo/MainLogo";

export default function HeaderComponent() {
  const [themeState, setThemeState] = useState("light");
  const html = document.getElementById("html");
  const toggleTheme = () => {
    if (themeState === "light") {
      html.setAttribute("data-theme", "dark");
      setThemeState("dark");
    } else {
      html.setAttribute("data-theme", "light");
      setThemeState("light");
    }
  };
  return (
    <header className="flex justify-between gap-4 px-3 py-4 items-center bg-[rgba(255,255,255,0.01)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.9px] border-b border-b-neutral/10 fixed top-0 left-0 w-full z-10">
      <MainLogoComponent
        mainColor={"text-primary"}
        subColor={"text-secondary"}
      />
      <div className="flex items-center gap-8">
        <NavbarComponent />
        <div className="flex gap-2">
          <button className="btn btn-primary rounded-full px-5 btn-outline">
            Login
          </button>
          <button className="btn btn-primary rounded-full px-5">
            Register
          </button>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost rounded-full p-2.5 h-auto w-auto text-lg"
          >
            {themeState === "dark" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </header>
  );
}
