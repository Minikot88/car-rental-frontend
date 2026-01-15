import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css"; // shared auth styles

function Register() {
  const [form, setForm] = useState({
    fullname: "",
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
    console.log("REGISTER DATA:", form);
    // TODO: call register API
  };

  return (
    <div className="auth-page">
      {/* show class is required so card is visible */}
      <div className="auth-card show">
        <h2 className="auth-title">สมัครสมาชิก</h2>

        <form onSubmit={handleSubmit}>
          {/* Fullname */}
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              name="fullname"
              placeholder="ชื่อ - นามสกุล"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-button">
            สมัครสมาชิก
          </button>
        </form>

        <p className="auth-note">
          มีบัญชีแล้วใช่ไหม? <Link to="/login">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
