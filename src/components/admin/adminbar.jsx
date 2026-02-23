import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/Adminbar.css";

const API = import.meta.env.VITE_API_URL;

export default function Adminbar() {
  const token = localStorage.getItem("token");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) setRole(data.role);
      } catch {
        if (isMounted) setRole(null);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (role !== "ADMIN") return null;

return (
  <div className="subnav">
    <div className="subnav-container">
      <NavLink to="/admin/operations" className={({ isActive }) => `subnav-item ${isActive ? "active" : ""}`}>
        Control Center
      </NavLink>

      <NavLink to="/admin" end className={({ isActive }) => `subnav-item ${isActive ? "active" : ""}`}>
        Dashboard
      </NavLink>

      <NavLink to="/admin/bookings" className={({ isActive }) => `subnav-item ${isActive ? "active" : ""}`}>
        การจอง
      </NavLink>

      <NavLink to="/admin/cars" className={({ isActive }) => `subnav-item ${isActive ? "active" : ""}`}>
        รถ
      </NavLink>

      <NavLink to="/admin/users" className={({ isActive }) => `subnav-item ${isActive ? "active" : ""}`}>
        ผู้ใช้
      </NavLink>

      <NavLink to="/admin/settings" className={({ isActive }) => `subnav-item ${isActive ? "active" : ""}`}>
        ตั้งค่า
      </NavLink>
    </div>
  </div>
);
}