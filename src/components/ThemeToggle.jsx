import { useTheme } from "@/context/ThemeContext";
import "./styles/ThemeToggle.css";

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-btn ${compact ? "compact" : ""}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      type="button"
    >
      <span className="theme-track">
        <span className={`theme-thumb ${theme}`} />
      </span>

      {!compact && (
        <span className="theme-label">
          {theme === "light"
            ? "เปลี่ยนเป็น Dark Mode"
            : "เปลี่ยนเป็น Light Mode"}
        </span>
      )}
    </button>
  );
}