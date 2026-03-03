import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "@/utils/axios";
import "./styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  //////////////////////////////////////////////////////
  // PHONE FORMAT
  //////////////////////////////////////////////////////
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 10);
    const parts = [];
    if (numbers.length > 0) parts.push(numbers.slice(0, 3));
    if (numbers.length >= 4) parts.push(numbers.slice(3, 6));
    if (numbers.length >= 7) parts.push(numbers.slice(6, 10));
    return parts.join("-");
  };

  //////////////////////////////////////////////////////
  // PASSWORD STRENGTH
  //////////////////////////////////////////////////////
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength(form.password);

  const passwordRules = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  //////////////////////////////////////////////////////
  // USERNAME CHECK (Debounce)
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!form.username || form.username.length < 3) {
      setUsernameStatus(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setCheckingUsername(true);

        const res = await api.get(
          `/auth/check-username/${form.username.toLowerCase()}`,
          { skipLoading: true }
        );

        setUsernameStatus(
          res.data.available ? "available" : "taken"
        );
      } catch {
        setUsernameStatus(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [form.username]);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }));
      return;
    }

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
  // VALIDATION
  //////////////////////////////////////////////////////
  const validate = () => {
    const newErrors = {};
    const rawPhone = form.phone.replace(/-/g, "");

    if (form.username.length < 3)
      newErrors.username = "Username ต้องอย่างน้อย 3 ตัวอักษร";

    if (usernameStatus !== "available")
      newErrors.username = "กรุณาใช้ Username อื่น";

    if (!form.name.trim())
      newErrors.name = "กรุณากรอกชื่อ";

    if (!form.surname.trim())
      newErrors.surname = "กรุณากรอกนามสกุล";

    if (rawPhone.length !== 10)
      newErrors.phone = "เบอร์โทรต้อง 10 หลัก";

    if (!form.address.trim())
      newErrors.address = "กรุณากรอกที่อยู่";

    if (strength < 4)
      newErrors.password = "รหัสผ่านยังไม่แข็งแรงพอ";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";

    return newErrors;
  };

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await api.post(
        "/auth/register",
        {
          ...form,
          username: form.username.toLowerCase(),
          phone: form.phone.replace(/-/g, ""),
        },
        { skipLoading: true }
      );

      await Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/login", { replace: true });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "สมัครสมาชิกไม่สำเร็จ",
        text:
          err.response?.data?.message ||
          "เกิดข้อผิดพลาด",
      });
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="register-page">
      <div className="register-card">
        <h2>สมัครสมาชิก</h2>

        <form onSubmit={handleSubmit}>

          {/* USERNAME */}
          <div className="input-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
              required
            />

            {checkingUsername && (
              <small className="muted">
                กำลังตรวจสอบ...
              </small>
            )}

            {usernameStatus === "available" && !checkingUsername && (
              <small className="success-text">
                ใช้งานได้
              </small>
            )}

            {usernameStatus === "taken" && !checkingUsername && (
              <small className="error-text">
                Username ถูกใช้งานแล้ว
              </small>
            )}

            {errors.username && (
              <small className="error-text">
                {errors.username}
              </small>
            )}
          </div>

          {/* NAME */}
          <div className="row">
            <div className="input-group">
              <label>ชื่อ</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                required
              />
              {errors.name && (
                <small className="error-text">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="input-group">
              <label>นามสกุล</label>
              <input
                name="surname"
                value={form.surname}
                onChange={handleChange}
                className={errors.surname ? "error" : ""}
                required
              />
              {errors.surname && (
                <small className="error-text">
                  {errors.surname}
                </small>
              )}
            </div>
          </div>

          {/* PHONE */}
          <div className="input-group">
            <label>เบอร์โทร</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              required
            />
            {errors.phone && (
              <small className="error-text">
                {errors.phone}
              </small>
            )}
          </div>

          {/* ADDRESS */}
          <div className="input-group">
            <label>ที่อยู่</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className={errors.address ? "error" : ""}
              required
            />
            {errors.address && (
              <small className="error-text">
                {errors.address}
              </small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="input-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              required
            />
            <span
              className="password-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <small className="error-text">
                {errors.password}
              </small>
            )}
          </div>

          {/* STRENGTH BAR */}
          {form.password && (
            <>
              <div className="strength-wrapper">
                <div
                  className="strength-bar"
                  style={{
                    width: `${(strength / 4) * 100}%`,
                  }}
                />
              </div>

              <ul className="password-checklist">
                <li className={passwordRules.length ? "valid" : ""}>
                  อย่างน้อย 8 ตัวอักษร
                </li>
                <li className={passwordRules.uppercase ? "valid" : ""}>
                  มีตัวพิมพ์ใหญ่
                </li>
                <li className={passwordRules.number ? "valid" : ""}>
                  มีตัวเลข
                </li>
                <li className={passwordRules.special ? "valid" : ""}>
                  มีอักขระพิเศษ
                </li>
              </ul>
            </>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
              required
            />
            {errors.confirmPassword && (
              <small className="error-text">
                {errors.confirmPassword}
              </small>
            )}
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              usernameStatus !== "available" ||
              strength < 4
            }
          >
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