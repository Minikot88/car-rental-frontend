// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#ff0000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",   // 👈 ลดค่าตรงนี้ ปุ่มจะขยับเข้าซ้าย
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        color: "white",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "28px" }}>🚗</span>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Car</span>
      </div>

      {/* Right Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginRight: "15px",  // 👈 ขยับกลุ่มปุ่มเข้ามาเพิ่ม
        }}
      >
        <Link
          to="/login"
          style={{
            backgroundColor: "white",
            color: "#ff0000",
            padding: "6px 14px",
            borderRadius: "6px",
            fontWeight: "bold",
            textDecoration: "none",
            border: "2px solid white",
          }}
        >
          เข้าสู่ระบบ
        </Link>

        <Link
          to="/register"
          style={{
            backgroundColor: "white",
            color: "#ff0000",
            padding: "6px 14px",
            borderRadius: "6px",
            fontWeight: "bold",
            textDecoration: "none",
            border: "2px solid white",
          }}
        >
          สมัครสมาชิก
        </Link>
      </div>
    </nav>
  );
}
