import { NavLink } from "react-router-dom";
import "../styles/admin-sidebar.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">ADMIN</h2>

      <nav className="admin-menu">
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/cars">รถ</NavLink>
        <NavLink to="/admin/bookings">การจอง</NavLink>
        <NavLink to="/admin/users">ผู้ใช้</NavLink>
        <NavLink to="/admin/settings">ตั้งค่า</NavLink>
      </nav>
    </aside>
  );
}
