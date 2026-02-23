import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./styles/Login.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
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
      await api.post("/auth/register", form);
      navigate("/login", { replace: true });
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "สมัครสมาชิกไม่สำเร็จ"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card show">
        <h2>สมัครสมาชิก</h2>

        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="name" placeholder="ชื่อ" onChange={handleChange} required />
          <input name="surname" placeholder="นามสกุล" onChange={handleChange} required />
          <input name="phone" placeholder="เบอร์โทร" onChange={handleChange} required />
          <input name="address" placeholder="ที่อยู่" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <button type="submit" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p>
          มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
