import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {

  //////////////////////////////////////////////////////
  // INITIAL THEME (safe)
  //////////////////////////////////////////////////////
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";

    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  //////////////////////////////////////////////////////
  // APPLY THEME
  //////////////////////////////////////////////////////
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //////////////////////////////////////////////////////
  // SYSTEM THEME SYNC
  //////////////////////////////////////////////////////
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const saved = localStorage.getItem("theme");

      // ถ้า user ไม่เคย override theme
      if (!saved) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handleChange);

    return () =>
      media.removeEventListener("change", handleChange);
  }, []);

  //////////////////////////////////////////////////////
  // CROSS TAB SYNC
  //////////////////////////////////////////////////////
  useEffect(() => {
    const syncTheme = (e) => {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    };

    window.addEventListener("storage", syncTheme);

    return () =>
      window.removeEventListener("storage", syncTheme);
  }, []);

  //////////////////////////////////////////////////////
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  //////////////////////////////////////////////////////
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}