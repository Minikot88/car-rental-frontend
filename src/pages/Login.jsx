// src/pages/Login.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    api.post("/auth/login", form).then(() => {
      nav("/");
    });
  };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <h2 style={styles.title}>เข้าสู่ระบบ</h2>

        {/* Email */}
        <div style={styles.inputGroup}>
          <svg width="20" height="20" viewBox="0 0 24 24" style={styles.icon}>
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="#999"
              strokeWidth="2"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="#999"
              strokeWidth="2"
            />
          </svg>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Password */}
        <div style={styles.inputGroup}>
          <svg width="20" height="20" viewBox="0 0 24 24" style={styles.icon}>
            <path
              d="M17 11H7C5.9 11 5 11.9 5 13V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V13C19 11.9 18.1 11 17 11Z"
              stroke="#999"
              strokeWidth="2"
            />
            <path
              d="M12 15V17"
              stroke="#999"
              strokeWidth="2"
            />
            <path
              d="M9 11V7C9 4.8 10.8 3 13 3C15.2 3 17 4.8 17 7V11"
              stroke="#999"
              strokeWidth="2"
            />
          </svg>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Button */}
        <button onClick={submit} style={styles.buttonGradient}>
          Login
        </button>

        <p style={styles.note}>
          ยังไม่มีบัญชี?{" "}
          <a href="/register" style={styles.link}>
            สมัครสมาชิก
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;


// ⭐ STYLES (ใช้ร่วมกับ Register)
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 60px)",
    paddingTop: "60px",
    backgroundColor: "#f8f8f8",
  },

  card: {
    width: "360px",
    padding: "35px",
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.4s ease",
  },

  title: {
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
  },

  inputGroup: {
    position: "relative",
    marginBottom: "18px",
  },

  icon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    padding: "12px 14px 12px 42px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "0.2s",
    boxSizing: "border-box", // ⭐ ป้องกันล้น
  },

  buttonGradient: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, var(--primary-2), var(--primary))",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },

  note: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
  },

  link: {
    color: "var(--primary)",
    textDecoration: "none",
    fontWeight: "500",
  },
};
