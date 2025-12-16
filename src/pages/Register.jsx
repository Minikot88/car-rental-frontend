// src/pages/Register.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
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
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <h2 style={styles.title}>สมัครสมาชิก</h2>

        {/* Fullname */}
        <div style={styles.inputGroup}>
          <svg width="20" height="20" viewBox="0 0 24 24" style={styles.icon}>
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="#999"
              strokeWidth="2"
            />
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22"
              stroke="#999"
              strokeWidth="2"
            />
          </svg>

          <input
            name="fullname"
            placeholder="ชื่อ - นามสกุล"
            onChange={change}
            style={styles.input}
          />
        </div>

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
            onChange={change}
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
            onChange={change}
            style={styles.input}
          />
        </div>

        <button onClick={register} style={styles.buttonGradient}>
          สมัครสมาชิก
        </button>

        <p style={styles.note}>
          มีบัญชีแล้วใช่ไหม?{" "}
          <a href="/login" style={styles.link}>
            เข้าสู่ระบบ
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;


// ⭐ ใช้ styles ร่วมกับ Login
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
    boxSizing: "border-box", // ⭐ แก้ล้น 100%
  },

  buttonGradient: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #ff4d4d, #b30000)",
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
    color: "#ff0000",
    textDecoration: "none",
    fontWeight: "500",
  },
};
