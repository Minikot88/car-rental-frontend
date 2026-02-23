import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      const token = res.data?.accessToken;
      if (!token) throw new Error("No token received");

      // 🔥 เก็บ token
      localStorage.setItem("token", token);

      // 🔥 เก็บ role เผื่อใช้เช็ค frontend
      localStorage.setItem("role", res.data.user.role);

      // 🔥 ถ้า admin ไปหน้า admin
      if (res.data.user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card show">
        <h2 className="auth-title">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p>
          ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
