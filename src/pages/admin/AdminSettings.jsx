import { useEffect, useState } from "react";
import "../styles/admin-form.css";

/* ===== MOCK API ===== */
const fetchSettings = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          siteName: "Car Rental System",
          phone: "063-1019403",
          line: "@carrental",
          bookingEnabled: true,
        }),
      800
    )
  );

const saveSettingsAPI = (data) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(data), 1200)
  );

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [draft, setDraft] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* ===== LOAD SETTINGS ===== */
  useEffect(() => {
    fetchSettings().then((data) => {
      setSettings(data);
      setDraft(data);
    });
  }, []);

  if (!settings) {
    return <p>⏳ กำลังโหลดการตั้งค่า...</p>;
  }

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDraft({
      ...draft,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (!draft.siteName.trim()) return "กรุณากรอกชื่อเว็บไซต์";
    if (!draft.phone.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
    return null;
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const saved = await saveSettingsAPI(draft);
      setSettings(saved);
      setDraft(saved);
      setEditing(false);
      setMessage({
        type: "success",
        text: "บันทึกการตั้งค่าเรียบร้อย",
      });
    } catch {
      setMessage({
        type: "error",
        text: "ไม่สามารถบันทึกข้อมูลได้",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setDraft(settings);
    setEditing(false);
    setMessage(null);
  };

  return (
    <>
      <h1>ตั้งค่าระบบ</h1>

      <form className="admin-form" onSubmit={saveSettings}>
        {/* ===== HEADER ===== */}
        <div className="form-header">
          <h2>การตั้งค่าระบบ</h2>
          <p>จัดการข้อมูลพื้นฐานของระบบ</p>
        </div>

        {/* ===== MESSAGE ===== */}
        {message && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* ===== GENERAL ===== */}
        <div className="form-section">
          <h3>ข้อมูลทั่วไป</h3>

          <div className="form-group">
            <label>ชื่อเว็บไซต์</label>
            <input
              name="siteName"
              value={draft.siteName}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
        </div>

        {/* ===== CONTACT ===== */}
        <div className="form-section">
          <h3>ข้อมูลติดต่อ</h3>

          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input
              name="phone"
              value={draft.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="form-group">
            <label>Line Official</label>
            <input
              name="line"
              value={draft.line}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
        </div>

        {/* ===== SYSTEM ===== */}
        <div className="form-section">
          <h3>ระบบ</h3>

          <div className="form-group checkbox">
            <div className="switch">
              <input
                type="checkbox"
                id="bookingEnabled"
                name="bookingEnabled"
                checked={draft.bookingEnabled}
                onChange={handleChange}
                disabled={!editing}
              />
              <span className="slider" />
            </div>
            <label htmlFor="bookingEnabled">
              เปิดระบบจองรถ
              <small>ปิดเพื่อหยุดการจองชั่วคราว</small>
            </label>
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="form-actions">
          {!editing ? (
            <button
              type="button"
              className="secondary"
              onClick={() => setEditing(true)}
            >
              ✏️ แก้ไข
            </button>
          ) : (
            <>
              <button
                type="button"
                className="ghost"
                onClick={cancelEdit}
                disabled={loading}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="primary"
                disabled={loading}
              >
                {loading ? "⏳ กำลังบันทึก..." : "💾 บันทึก"}
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
