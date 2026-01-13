import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/SubNav.css";

export default function SubNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="subnav">
      <div className="subnav-container">
        <Link to="/" className={`subnav-item ${isActive("/") ? "active" : ""}`}>
          หน้าแรก
        </Link>

        <Link
          to="/cars"
          className={`subnav-item ${isActive("/cars") ? "active" : ""}`}
        >
          รถทั้งหมด
        </Link>

        <Link
          to="/search"
          className={`subnav-item ${isActive("/search") ? "active" : ""}`}
        >
          จองรถ
        </Link>

        <Link
          to="/profile"
          className={`subnav-item ${isActive("/profile") ? "active" : ""}`}
        >
          โปรไฟล์
        </Link>
      </div>
    </div>
  );
}
