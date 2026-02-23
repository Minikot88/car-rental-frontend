// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/useTheme";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import Swal from "sweetalert2";
import "./styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔥 ฟังก์ชัน Logout
  // 🔥 ฟังก์ชัน Logout
const handleLogout = async () => {
  // ✅ Confirm กลางจอ
  const result = await Swal.fire({
    title: "ออกจากระบบ?",
    text: "คุณต้องการออกจากระบบใช่หรือไม่",
    showCancelButton: true,
    confirmButtonText: "ออกจากระบบ",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    background: theme === "dark" ? "#1e1e1e" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
  });

  if (!result.isConfirmed) return;

  localStorage.clear();
  setMenuOpen(false);
  navigate("/");

  // ✅ Toast มุมขวาบน
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "ออกจากระบบเรียบร้อย",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: theme === "dark" ? "#1e1e1e" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
  });
};

  // 🔒 ปิด dropdown เมื่อคลิกนอกพื้นที่
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-left">
          <Link to="/" className="logo">
            Car
          </Link>
        </div>

        <div className="nav-right">
          {!token ? (
            <>
              <Link to="/login" className="btn-auth primary">
                เข้าสู่ระบบ
              </Link>
              <Link to="/register" className="btn-auth ghost">
                สมัครสมาชิก
              </Link>
            </>
          ) : (
            <div className="dropdown" ref={dropdownRef}>
              <button
                className="btn-auth primary user-btn"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <FiUser size={16} />
                {user?.name?.split(" ")[0] || "User"}
                <FiChevronDown size={14} />
              </button>

              {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <FiUser size={15} />
                    โปรไฟล์
                  </Link>

                  <button onClick={handleLogout}>
                    <FiLogOut size={15} />
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="เปลี่ยนธีม"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}