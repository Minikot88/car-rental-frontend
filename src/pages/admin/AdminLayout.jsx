import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FiHome, FiUsers, FiTruck, FiLogOut } from "react-icons/fi";
import "../styles/admin-layout.css";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          🚗 Admin Panel
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end>
            <FiHome /> Dashboard
          </NavLink>

          <NavLink to="/admin/bookings">
            <FiTruck /> การจอง
          </NavLink>

          <NavLink to="/admin/cars">
            <FiTruck /> รถ
          </NavLink>

          <NavLink to="/admin/users">
            <FiUsers /> ผู้ใช้
          </NavLink>
        </nav>

        <div className="admin-footer">
          <div className="admin-user">
            👤 {user?.name || "Admin"}
          </div>

          <button onClick={logout} className="logout-btn">
            <FiLogOut /> ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}