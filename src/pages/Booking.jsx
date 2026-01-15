import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { carData } from "../data/cars";
import "./styles/Booking.css";

export default function Booking() {
  const { id } = useParams();
  const car = carData.find((c) => String(c.id) === String(id));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    start: "",
    end: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!car) {
    return <p className="booking-error">ไม่พบข้อมูลรถ</p>;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ================= SUBMITTED ================= */
  if (submitted) {
    return (
      <div className="booking-page">
        <div className="booking-success">
          <div className="booking-success-icon">✅</div>
          <h2>ส่งคำขอเรียบร้อย</h2>

          <p>
            ข้อมูลการจองสำหรับ <strong>{car.name}</strong> ถูกส่งแล้ว
          </p>

          <p className="muted">
            ทีมงานจะติดต่อกลับเพื่อยืนยันการจอง
          </p>

          <Link to="/cars" className="booking-back-link">
            ← กลับไปดูรถทั้งหมด
          </Link>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */
  return (
    <div className="booking-page">
      <div className="booking-card">
        {/* LEFT : FORM */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>จองรถ: {car.name}</h2>

          <div className="booking-field">
            <label>ชื่อ - นามสกุล</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-field">
            <label>เบอร์โทรศัพท์</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-dates">
            <div className="booking-field">
              <label>วันที่เริ่ม</label>
              <input
                type="date"
                name="start"
                value={form.start}
                onChange={handleChange}
                required
              />
            </div>

            <div className="booking-field">
              <label>วันที่สิ้นสุด</label>
              <input
                type="date"
                name="end"
                value={form.end}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="booking-submit">
            ส่งคำขอจอง
          </button>
        </form>

        {/* RIGHT : SUMMARY */}
        <div className="booking-summary">
          <div className="booking-summary-image">
            {car.image || car.img ? (
              <img src={car.image || car.img} alt={car.name} />
            ) : (
              <div className="booking-image-placeholder">🚗</div>
            )}
          </div>

          <div className="booking-summary-body">
            <h3>{car.name}</h3>
            <p className="muted">
              {car.type || "ไม่ระบุ"} • {car.seats || 5} ที่นั่ง
            </p>

            <div className="booking-price">
              ฿{car.price.toLocaleString()}
              <span>/วัน</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
