// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/useTheme";
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { SwalConfirm, SwalSuccess, SwalError } from "@/utils/swal";
import "./styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////
  const handleLogout = async () => {
    const result = await SwalConfirm({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจากระบบใช่หรือไม่",
      confirmButtonText: "ออกจากระบบ",
    });

    if (!result.isConfirmed) return;

    try {
      await logout();
      setMenuOpen(false);
      navigate("/");

      SwalSuccess({
        title: "ออกจากระบบเรียบร้อย",
      });
    } catch {
      SwalError({
        title: "เกิดข้อผิดพลาด",
      });
    }
  };

  //////////////////////////////////////////////////////
  // CLOSE DROPDOWN ON OUTSIDE CLICK
  //////////////////////////////////////////////////////
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  //////////////////////////////////////////////////////
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-left">
          <Link to="/" className="logo">
            CarRental
          </Link>
        </div>

        <div className="nav-right">
          {!user ? (
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
                {user.role === "ADMIN"
                  ? "Admin"
                  : user.name}
                <FiChevronDown size={14} />
              </button>

              {menuOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiUser size={15} />
                    โปรไฟล์
                  </Link>

                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

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