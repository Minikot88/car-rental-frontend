// src/components/admin/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>ADMIN</h2>

      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/cars">รถ</NavLink>
      <NavLink to="/admin/bookings">การจอง</NavLink>
      <NavLink to="/admin/users">ผู้ใช้</NavLink>
      <NavLink to="/admin/settings">ตั้งค่า</NavLink>
    </aside>
  );
}
