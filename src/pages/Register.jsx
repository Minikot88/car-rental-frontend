import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./styles/Login.css"; // ⭐ ใช้ CSS เดียวกับ Login

function Register() {
  const nav = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = () => {
    api.post("/auth/register", form).then(() => {
      nav("/login");
    });
  };

  return (
    <div className="auth-page">
      <div className={`auth-card ${animate ? "show" : ""}`}>
        <h2 className="auth-title">สมัครสมาชิก</h2>

        {/* Fullname */}
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            name="fullname"
            placeholder="ชื่อ - นามสกุล"
            onChange={change}
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <span className="input-icon">📧</span>
          <input
            name="email"
            placeholder="Email"
            onChange={change}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={change}
          />
        </div>

        <button className="auth-button" onClick={register}>
          สมัครสมาชิก
        </button>

        <p className="auth-note">
          มีบัญชีแล้วใช่ไหม?{" "}
          <Link to="/login">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
