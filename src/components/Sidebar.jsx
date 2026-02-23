import { NavLink } from "react-router-dom";
import "./styles/admin-sidebar.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">AIRPORT RENTAL</h2>

      <nav className="admin-menu">

        {/* 🚐 Operations Center (รวม Check-in / Check-out) */}
        <NavLink to="/admin/operations">
          🚐 Operations Center
        </NavLink>

        {/* 📊 Dashboard */}
        <NavLink to="/admin" end>
          📊 Dashboard
        </NavLink>

        {/* 📅 Bookings */}
        <NavLink to="/admin/bookings">
          📅 การจอง
        </NavLink>

        {/* 🚗 Cars */}
        <NavLink to="/admin/cars">
          🚗 รถ
        </NavLink>

        {/* 👤 Users */}
        <NavLink to="/admin/users">
          👤 ผู้ใช้
        </NavLink>

        {/* ⚙️ Settings */}
        <NavLink to="/admin/settings">
          ⚙️ ตั้งค่า
        </NavLink>

      </nav>
    </aside>
  );
}
