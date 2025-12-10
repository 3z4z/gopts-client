export const toggleTheme = (themeState, setThemeState, htmlElement) => {
  const updateTheme = themeState === "light" ? "dark" : "light";
  htmlElement.setAttribute("data-theme", updateTheme);
  setThemeState(updateTheme);
  localStorage.setItem("theme", updateTheme);
};
