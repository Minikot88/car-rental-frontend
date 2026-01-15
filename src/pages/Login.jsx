import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LOGIN DATA:", form);
  };

  return (
    <div className="auth-page">
      {/* ใส่ show ตรงนี้เลย */}
      <div className="auth-card show">
        <h2 className="auth-title">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="auth-note">
          ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
