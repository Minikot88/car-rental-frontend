import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Car Rental System",
    phone: "063-1019403",
    line: "@carrental",
    bookingEnabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = (e) => {
    e.preventDefault();
    alert("💾 บันทึกการตั้งค่าเรียบร้อย (mock)");
    console.log("SETTINGS:", settings);
  };

  return (
    <>
      <h1>ตั้งค่าระบบ</h1>

      <form
        onSubmit={saveSettings}
        className="admin-form"
      >
        <div className="form-group">
          <label>ชื่อเว็บไซต์</label>
          <input
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Line Official</label>
          <input
            name="line"
            value={settings.line}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="bookingEnabled"
              checked={settings.bookingEnabled}
              onChange={handleChange}
            />
            เปิดระบบจองรถ
          </label>
        </div>

        <button className="primary">
          บันทึกการตั้งค่า
        </button>
      </form>
    </>
  );
}
