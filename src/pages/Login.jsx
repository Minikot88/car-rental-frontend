import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./styles/Login.css";

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    api.post("/auth/login", form).then(() => {
      nav("/");
    });
  };

  return (
    <div className="auth-page">
      <div className={`auth-card ${animate ? "show" : ""}`}>
        <h2 className="auth-title">เข้าสู่ระบบ</h2>

        {/* Email */}
        <div className="input-group">
          <span className="input-icon">📧</span>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <button className="auth-button" onClick={submit}>
          เข้าสู่ระบบ
        </button>

        <p className="auth-note">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
