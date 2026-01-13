// src/pages/Booking.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { carData, contact } from "../data/cars";

export default function Booking() {
  const { id } = useParams();
  const car = carData.find((c) => c.id === id);

  const [form, setForm] = useState({ name: "", phone: "", start: "", end: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!car) return <p>รถไม่พบข้อมูล</p>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now: no backend — just show confirmation and contact link
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div style={{ padding: 20 }}>
        <h2>ส่งคำร้องขอเรียบร้อย</h2>
        <p>ข้อมูลการจองสำหรับ <strong>{car.name}</strong> ถูกส่งแล้ว</p>
        <p>เราจะแจ้งยืนยันทาง Line หรือโทรศัพท์ที่คุณให้ไว้</p>
        <p>
          ติดต่อด่วน: <a href={contact.line} target="_blank" rel="noreferrer">แชททาง Line</a> หรือ <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        </p>
        <Link to="/cars" style={{ color: "var(--primary)" }}>กลับไปดูรถ</Link>
      </div>
    );

  return (
    <div style={{ padding: 20, maxWidth: 640 }}>
      <h2>จอง: {car.name}</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          ชื่อ-สกุล
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
        </label>

        <label>
          เบอร์โทร
          <input name="phone" value={form.phone} onChange={handleChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <label>
            วันที่เริ่ม
            <input type="date" name="start" value={form.start} onChange={handleChange} required style={{ width: "100%" }} />
          </label>

          <label>
            วันที่สิ้นสุด
            <input type="date" name="end" value={form.end} onChange={handleChange} required style={{ width: "100%" }} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" style={{ padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>ส่งคำขอ</button>
          <a href={contact.line} target="_blank" rel="noreferrer" style={{ padding: "10px 14px", border: "1px solid var(--primary)", color: "var(--primary)", borderRadius: 8, textDecoration: "none" }}>ติดต่อ Line</a>
        </div>
      </form>
    </div>
  );
}
