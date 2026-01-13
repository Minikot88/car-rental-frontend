// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/useTheme";
import "./styles/Navbar.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const goSearch = () => {
    const q = encodeURIComponent(query || "");
    const parts = [];
    if (from) parts.push(`from=${from}`);
    if (to) parts.push(`to=${to}`);
    if (q) parts.push(`q=${q}`);
    navigate(`/cars?${parts.join("&")}`);
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="logo">
            <span className="logo-icon">🚗</span>
            <span className="logo-text">CarRental</span>
          </Link>

          <div className="nav-search">
            <span className="search-icon">🔍</span>
            <input
              placeholder="ค้นหารถ, รุ่น หรือพื้นที่"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
            />
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <button onClick={goSearch}>ค้นหา</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <Link to="/login" className="btn-auth primary">เข้าสู่ระบบ</Link>
          <Link to="/register" className="btn-auth ghost">สมัครสมาชิก</Link>

          <button className="theme-toggle" onClick={toggleTheme}>
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

      {/* MOBILE */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <input
          placeholder="ค้นหารถ"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={goSearch}>ค้นหา</button>

        <Link to="/login" onClick={() => setMobileOpen(false)}>เข้าสู่ระบบ</Link>
        <Link to="/register" onClick={() => setMobileOpen(false)}>สมัครสมาชิก</Link>
      </div>
    </nav>
  );
}
