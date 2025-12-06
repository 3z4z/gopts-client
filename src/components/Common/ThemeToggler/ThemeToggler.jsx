import { useTheme } from "../../../hooks/useTheme";

export function ThemeToggler() {
  const { themeState, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {themeState === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
