import { useParams, Link } from "react-router-dom";
import { carData } from "../data/cars";
import { useEffect } from "react";
import "./styles/CarDetail.css";

function CarDetail() {
  const { id } = useParams();

  /* ================= FIND CAR (DERIVED DATA) ================= */
  const car = carData.find(
    (c) => String(c.id) === String(id)
  );

  /* ================= MOCK AVAILABILITY ================= */
  const unavailableDates = [
    "2026-01-20",
    "2026-01-21",
    "2026-01-25",
    "2026-01-28",
  ];

  /* ================= SCROLL ANIMATION ================= */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ================= NOT FOUND ================= */
  if (!car) {
    return (
      <div className="car-detail-loading">
        ❌ ไม่พบข้อมูลรถ
      </div>
    );
  }

  /* mock เดือน/วันนี้ */
  const mockMonth = "2026-01";
  const today = 15;

  return (
    <div className="car-detail-page">
      {/* ================= HERO ================= */}
      <div className="car-detail-hero reveal">
        {/* IMAGE */}
        <div className="car-detail-image-wrap">
          <img src={car.image} alt={car.name} />
        </div>

        {/* INFO */}
        <div className="car-detail-info">
          <h1 className="car-detail-title">{car.name}</h1>

          <div className="car-detail-rating">
            ⭐ {car.ratings?.score ?? 4.5}
            <span>({car.ratings?.reviews ?? 0} รีวิว)</span>
            <span className="badge success">พร้อมใช้งาน</span>
          </div>

          <div className="car-detail-meta">
            <span>🚘 {car.type}</span>
            <span>👥 {car.seats} ที่นั่ง</span>
            <span>⚙️ {car.transmission}</span>
          </div>

          <div className="car-detail-price pop">
            ฿{car.price.toLocaleString()}
            <span>/วัน</span>
          </div>

          <ul className="car-detail-benefits">
            <li>✔ ประกันพื้นฐาน</li>
            <li>✔ ยกเลิกฟรี 24 ชม.</li>
            <li>✔ รับ–คืนสนามบิน</li>
            <li>✔ ไม่มีค่าธรรมเนียมแอบแฝง</li>
          </ul>

        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <section className="car-detail-section reveal">
        <h2>รายละเอียดรถ</h2>

        <div className="car-detail-grid">
          <div>
            <strong>ประเภทรถ</strong>
            <span>{car.type}</span>
          </div>
          <div>
            <strong>จำนวนที่นั่ง</strong>
            <span>{car.seats}</span>
          </div>
          <div>
            <strong>ระบบเกียร์</strong>
            <span>{car.transmission}</span>
          </div>
          <div>
            <strong>เชื้อเพลิง</strong>
            <span>{car.fuel}</span>
          </div>
          <div>
            <strong>ปีรถ</strong>
            <span>{car.year}</span>
          </div>
          <div>
            <strong>สถานะ</strong>
            <span className="success">พร้อมใช้งาน</span>
          </div>
        </div>
      </section>

      {/* ================= AVAILABILITY ================= */}
      <section className="car-detail-section reveal">
        <h2>สถานะรถ (เดือนนี้)</h2>

        <div className="availability-legend">
          <span><i className="dot available" /> ว่าง</span>
          <span><i className="dot unavailable" /> ไม่ว่าง</span>
          <span><i className="dot today" /> วันนี้</span>
        </div>

        <div className="availability-grid">
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${mockMonth}-${String(day).padStart(2, "0")}`;
            const isUnavailable = unavailableDates.includes(dateStr);
            const isToday = day === today;

            return (
              <div
                key={day}
                className={`availability-day
                  ${isUnavailable ? "unavailable" : "available"}
                  ${isToday ? "today" : ""}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>

        <p className="availability-note muted">
          * ข้อมูลนี้เป็น mockup ระบบจริงจะอัปเดตจากการจอง
        </p>
      </section>
    </div>
  );
}

export default CarDetail;
