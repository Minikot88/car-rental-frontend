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
          to="/carslist"
          className={`subnav-item ${isActive("/carslist") ? "active" : ""}`}
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
          to="/admin"
          className={`subnav-item ${isActive("/admin") ? "active" : ""}`}
        >
          admin-page
        </Link>
      </div>
    </div>
  );
}
