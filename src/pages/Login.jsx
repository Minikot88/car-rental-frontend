import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "@/utils/axios";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setForm((prev) => ({
        ...prev,
        username: value.toLowerCase().trim(),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // 🔥 สำคัญ: ไม่ต้องยุ่งกับ token เลย
      const res = await api.post("/auth/login", form);

      await Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });

      if (res.data.user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text:
          err.response?.data?.message ||
          "Username หรือรหัสผ่านไม่ถูกต้อง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "ซ่อน" : "แสดง"}
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              "เข้าสู่ระบบ"
            )}
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