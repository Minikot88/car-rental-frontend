import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "./styles/SubNav.css";

export default function SubNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const link = (to, label) => (
    <Link
      to={to}
      className={`subnav-item ${
        pathname === to ? "active" : ""
      }`}
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
        {link("/terms", "เงื่อนไข")}

        {user && link("/my-bookings", "ประวัติการจอง")}

        {user?.role === "ADMIN" &&
          link("/admin", "admin")}
      </div>
    </div>
  );
}