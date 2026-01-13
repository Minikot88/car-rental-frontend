import { useTheme } from "@/context/ThemeContext";
import "./styles/ThemeToggle.css";

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-btn ${compact ? "compact" : ""}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle dark / light mode"
    >
      <span className="theme-icon">
        {theme === "light" ? "🌙" : "☀️"}
      </span>

      {!compact && (
        <span className="theme-label">
          {theme === "light" ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
