// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, toggle }) {
  const sidebarStyle = {
    width: open ? "200px" : "60px",
    backgroundColor: "#fff",
    height: "100vh",
    position: "fixed",
    top: "60px",
    left: 0,
    paddingTop: "20px",
    transition: "0.3s ease",
    borderRight: "2px solid #ff0000",
    zIndex: 999,
  };

  const arrowButtonStyle = {
    position: "absolute",
    top: "50%",
    right: "-18px",
    transform: "translateY(-50%)",
    backgroundColor: "#ffffff",
    border: "2px solid #ff0000",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "0.25s",
  };

  const arrowHoverStyle = {
    ...arrowButtonStyle,
    backgroundColor: "#ff0000",
    color: "white",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    color: "#333",
    textDecoration: "none",
    gap: "12px",
    fontSize: "16px",
    transition: "0.2s",
  };

  const iconStyle = { fontSize: "20px" };

  const [hover, setHover] = React.useState(false);

  return (
    <div style={sidebarStyle}>
      {/* ปุ่ม SVG หรูหรา */}
      <div
        style={hover ? arrowHoverStyle : arrowButtonStyle}
        onClick={toggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* SVG Icon */}
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6L9 12L15 18"
              stroke={hover ? "#ffffff" : "#ff0000"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke={hover ? "#ffffff" : "#ff0000"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* เมนู */}
      <nav style={{ marginTop: "20px" }}>
        <Link to="/" style={menuItemStyle} onClick={toggle}>
          <span style={iconStyle}>🏠</span>
          {open && <span>หน้าแรก</span>}
        </Link>

        <Link to="/cars" style={menuItemStyle} onClick={toggle}>
          <span style={iconStyle}>🚘</span>
          {open && <span>รถทั้งหมด</span>}
        </Link>

        <Link to="/booking/1" style={menuItemStyle} onClick={toggle}>
          <span style={iconStyle}>📅</span>
          {open && <span>จองวันที่</span>}
        </Link>
      </nav>
    </div>
  );
}
