// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const styles = {
    nav: {
      width: "100%",
      height: "64px",
      background: "var(--nav-bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      color: "white",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    },
    content: {
      width: "min(1200px, 100%)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 12px",
    },
    left: { display: "flex", alignItems: "center", gap: 12 },
    logoIcon: { fontSize: 28 },
    logoText: { fontSize: 18, fontWeight: 800, letterSpacing: 0.3 },
    searchWrap: {
      display: "flex",
      alignItems: "center",
      background: "var(--surface)",
      padding: "6px 10px",
      borderRadius: 10,
      marginLeft: 14,
      boxShadow: "var(--shadow-elevation)",
    },
    searchIcon: { marginRight: 8, opacity: 0.7 },
    search: {
      minWidth: 220,
      border: "none",
      outline: "none",
      background: "transparent",
      color: "var(--text)",
      fontSize: 14,
    },
    dateInput: {
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid rgba(0,0,0,0.06)",
      fontSize: 13,
      background: "var(--card)",
      color: "var(--text)",
      marginLeft: 8,
    },
    searchButton: {
      marginLeft: 8,
      padding: "8px 12px",
      borderRadius: 8,
      border: "none",
      background: "linear-gradient(90deg,var(--primary),var(--primary-2))",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
    },
    actions: { display: "flex", alignItems: "center", gap: 12 },
    authPrimary: {
      backgroundColor: "white",
      color: "var(--primary)",
      padding: "8px 14px",
      borderRadius: 8,
      fontWeight: 800,
      textDecoration: "none",
      border: "none",
      boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    },
    authGhost: {
      backgroundColor: "transparent",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: 8,
      fontWeight: 700,
      textDecoration: "none",
      border: "1px solid rgba(255,255,255,0.14)",
    },
  };

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document && window.document.documentElement;
    const body = window.document && window.document.body;
    if (root) {
      if (theme === "dark") {
        root.classList.add("theme-dark");
        body && body.classList.add("theme-dark");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.remove("theme-dark");
        body && body.classList.remove("theme-dark");
        root.setAttribute("data-theme", "light");
      }
    }
    try {
      window.localStorage && window.localStorage.setItem("theme", theme);
    } catch (e) {
      if (typeof console !== "undefined" && typeof console.debug === "function") {
        console.debug("theme persistence failed", e);
      }
    }
  }, [theme]);

  return (
    <nav style={styles.nav} className="navbar" data-open={mobileOpen}>
      <div style={styles.content}>
        <div style={styles.left}>
        <span style={styles.logoIcon}>🚗</span>
        <span style={styles.logoText}>CarRental</span>

        <div style={styles.searchWrap} className="nav-search">
          <span style={styles.searchIcon}>🔍</span>
          <input
            aria-label="ค้นหารถ"
            placeholder="ค้นหารถ, รุ่น หรือพื้นที่"
            style={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const q = encodeURIComponent(query || "");
                const parts = [];
                if (from) parts.push(`from=${from}`);
                if (to) parts.push(`to=${to}`);
                if (q) parts.push(`q=${q}`);
                navigate(`/cars?${parts.join("&")}`);
              }
            }}
          />
          <input
            aria-label="วันที่เริ่ม"
            type="date"
            style={styles.dateInput}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            aria-label="วันที่สิ้นสุด"
            type="date"
            style={styles.dateInput}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button
            style={styles.searchButton}
            onClick={() => {
              const q = encodeURIComponent(query || "");
              const parts = [];
              if (from) parts.push(`from=${from}`);
              if (to) parts.push(`to=${to}`);
              if (q) parts.push(`q=${q}`);
              navigate(`/cars?${parts.join("&")}`);
            }}
            aria-label="Search"
          >
            ค้นหา
          </button>
        </div>
        </div>

        <button
          className="mobile-toggle"
          aria-label="Open menu"
          onClick={() => setMobileOpen((s) => !s)}
          style={{ display: "none", background: "transparent", border: "none", color: "inherit", fontSize: 22, cursor: "pointer", padding: 8 }}
        >
          ☰
        </button>

        <div style={styles.actions} className="nav-actions">
          <ul className="nav-list" style={{ display: "flex", gap: 12, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
            <li>
              <Link to="/login" style={styles.authPrimary} className="auth-primary">
                เข้าสู่ระบบ
              </Link>
            </li>

            <li>
              <Link to="/register" style={styles.authGhost} className="auth-ghost">
                สมัครสมาชิก
              </Link>
            </li>
          </ul>

          <button aria-label="Toggle theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} title="Toggle dark / light" style={{ marginLeft: 8, background: "transparent", border: "none", color: "inherit", fontSize: 18, cursor: "pointer", padding: 6, borderRadius: 8, }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input aria-label="ค้นหารถ" placeholder="ค้นหารถ, รุ่น หรือพื้นที่" style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #eee" }} value={query} onChange={(e) => setQuery(e.target.value)} />
          <button onClick={() => { const q = encodeURIComponent(query || ""); const parts = []; if (from) parts.push(`from=${from}`); if (to) parts.push(`to=${to}`); if (q) parts.push(`q=${q}`); navigate(`/cars?${parts.join("&")}`); setMobileOpen(false); }} style={{ padding: "8px 10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>ค้นหา</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link to="/login" style={{ padding: "8px 10px", background: "var(--primary)", color: "#fff", borderRadius: 8, textAlign: "center" }} onClick={() => setMobileOpen(false)}>เข้าสู่ระบบ</Link>
          <Link to="/register" style={{ padding: "8px 10px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, textAlign: "center" }} onClick={() => setMobileOpen(false)}>สมัครสมาชิก</Link>
        </div>
      </div>
    </nav>
  );
}
