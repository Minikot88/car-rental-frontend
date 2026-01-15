// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/useTheme";
import "./styles/Navbar.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="logo">
            <span className="logo-icon">🚗</span>
            <span className="logo-text">CarRental</span>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <Link to="/login" className="btn-auth primary">
            เข้าสู่ระบบ
          </Link>

          <Link to="/register" className="btn-auth ghost">
            สมัครสมาชิก
          </Link>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="เปลี่ยนธีม"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <Link to="/login" onClick={() => setMobileOpen(false)}>
          เข้าสู่ระบบ
        </Link>

        <Link to="/register" onClick={() => setMobileOpen(false)}>
          สมัครสมาชิก
        </Link>
      </div>
    </nav>
  );
}
