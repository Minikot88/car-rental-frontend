import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useMemo } from "react";
import { carData } from "../data/cars";
import "./styles/Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { start, end } = location.state || {};

  const car = carData.find(
    (c) => String(c.id) === String(id)
  );

  /* ===== helper ===== */
  const formatDate = (date) =>
    date
      ? new Date(date).toISOString().slice(0, 10)
      : "";

  /* ===== HOOKS MUST BE HERE ===== */
  const [form, setForm] = useState({
    name: "",
    phone: "",
    start: formatDate(start),
    end: formatDate(end),
  });

  const rentalDays = useMemo(() => {
    if (!form.start || !form.end) return 1;
    const diff =
      (new Date(form.end) - new Date(form.start)) /
      (1000 * 60 * 60 * 24);
    return Math.max(1, Math.ceil(diff));
  }, [form.start, form.end]);

  const totalPrice = useMemo(() => {
    return car ? rentalDays * car.price : 0;
  }, [rentalDays, car]);

  /* ===== GUARD AFTER HOOKS ===== */
  if (!car) {
    return (
      <p className="booking-error">
        ไม่พบข้อมูลรถ
      </p>
    );
  }

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment", {
      state: {
        car,
        form,
        rentalDays,
        totalPrice,
      },
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-layout">

        {/* ================= LEFT ================= */}
        <form className="booking-left" onSubmit={handleSubmit}>
          <div className="card">
            <h2>ข้อมูลผู้จอง</h2>

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
          </div>

          <div className="card">
            <h3>วันที่เช่ารถ</h3>

            <div className="booking-dates">
              <div className="booking-field">
                <label>วันรับรถ</label>
                <input
                  type="date"
                  name="start"
                  value={form.start}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking-field">
                <label>วันคืนรถ</label>
                <input
                  type="date"
                  name="end"
                  value={form.end}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button className="booking-submit">
            ดำเนินการต่อ
          </button>
        </form>

        {/* ================= RIGHT ================= */}
        <aside className="booking-right">
          <div className="card">
            <div className="booking-summary-image">
              <img
                src={car.image || car.img}
                alt={car.name}
              />
            </div>
            <h3>{car.name}</h3>
            <p className="muted">
              {car.type || "รถยนต์"} • {car.seats || 5} ที่นั่ง
            </p>
          </div>

          <div className="card">
            <h4>รายละเอียดการเช่า</h4>
            <div className="summary-row">
              <span>รับรถ</span>
              <strong>{form.start}</strong>
            </div>
            <div className="summary-row">
              <span>คืนรถ</span>
              <strong>{form.end}</strong>
            </div>
            <div className="summary-row">
              <span>จำนวนวัน</span>
              <strong>{rentalDays}</strong>
            </div>
          </div>

          <div className="card price-card">
            <h4>ราคา</h4>
            <div className="summary-row">
              <span>ราคา / วัน</span>
              <span>
                ฿{car.price.toLocaleString()}
              </span>
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <span>ราคารวม</span>
              <strong>
                ฿{totalPrice.toLocaleString()}
              </strong>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
