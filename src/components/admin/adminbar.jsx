import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "../styles/Adminbar.css";

export default function Adminbar() {
  const { user, loading } = useAuth();

  // รอโหลด user ก่อน
  if (loading) return null;

  // ไม่ใช่ admin → ไม่แสดง
  if (user?.role !== "ADMIN") return null;

  return (
    <div className="subnav">
      <div className="subnav-container">

        <NavLink
          to="/admin/operations"
          className={({ isActive }) =>
            `subnav-item ${isActive ? "active" : ""}`
          }
        >
          Control Center
        </NavLink>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `subnav-item ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `subnav-item ${isActive ? "active" : ""}`
          }
        >
          การจอง
        </NavLink>

        <NavLink
          to="/admin/cars"
          className={({ isActive }) =>
            `subnav-item ${isActive ? "active" : ""}`
          }
        >
          รถ
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `subnav-item ${isActive ? "active" : ""}`
          }
        >
          ผู้ใช้
        </NavLink>

      </div>
    </div>
  );
}