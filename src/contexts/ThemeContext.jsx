import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext({
  themeState: "light",
  toggleTheme: () => {},
});

const htmlElement = document.documentElement;

export const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState("light");
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
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeState, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
