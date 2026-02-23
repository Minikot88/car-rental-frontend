import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./styles/SubNav.css";

const API = import.meta.env.VITE_API_URL;

export default function SubNav() {
  const { pathname } = useLocation();
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

        if (isMounted) {
          setRole(data.role);
        }
      } catch {
        if (isMounted) {
          setRole(null);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const link = (to, label) => (
    <Link
      to={to}
      className={`subnav-item ${pathname === to ? "active" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="subnav">
      <div className="subnav-container">
        {link("/", "หน้าแรก")}
        {link("/carslist", "รถทั้งหมด")}
        {link("/search", "จองรถ")}
        {token && link("/my-bookings", "ประวัติการจอง")}
        {token && role === "ADMIN" && link("/admin", "admin")}
      </div>
    </div>
  );
}