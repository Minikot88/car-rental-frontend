import { useTheme } from "@/context/ThemeContext";
import "./styles/ThemeToggle.css";

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-btn ${compact ? "compact" : ""}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="theme-track">
        <span className={`theme-thumb ${theme}`} />
      </span>

      {!compact && (
        <span className="theme-label">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </button>
  );
}
