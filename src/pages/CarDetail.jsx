import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { carData } from "../data/cars";
import "./styles/CarDetail.css";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  /* ================= MOCK AVAILABILITY ================= */
  // YYYY-MM-DD
  const unavailableDates = [
    "2026-01-20",
    "2026-01-21",
    "2026-01-25",
    "2026-01-28",
  ];

  useEffect(() => {
    let cancelled = false;

    carData
      .get(`/cars/${id}`)
      .then((res) => {
        if (!cancelled) setCar(res.data);
      })
      .catch(() => {
        const found = carData.find((c) => String(c.id) === String(id));
        if (!cancelled) setCar(found || null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ================= SCROLL ANIMATION (SAFE) ================= */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("show")); // fallback แสดงก่อน

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

  if (!car) {
    return <p className="car-detail-loading">กำลังโหลดข้อมูล...</p>;
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
          <img src={car.image || car.img} alt={car.name} />
        </div>

        {/* INFO */}
        <div className="car-detail-info">
          <h1 className="car-detail-title">{car.name}</h1>

          <div className="car-detail-rating">
            ⭐ 4.7 <span>(128 รีวิว)</span>
            <span className="badge success">พร้อมใช้งาน</span>
          </div>

          <div className="car-detail-meta">
            <span>🚘 {car.type}</span>
            <span>👥 {car.seats} ที่นั่ง</span>
            <span>⚙️ {car.transmission || "Auto"}</span>
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

          <Link to={`/booking/${car.id}`} className="car-detail-book-btn">
            จองรถคันนี้
          </Link>
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
            <span>{car.transmission || "Auto"}</span>
          </div>
          <div>
            <strong>จุดรับรถ</strong>
            <span>สนามบิน / สำนักงาน</span>
          </div>
          <div>
            <strong>นโยบายยกเลิก</strong>
            <span>ยกเลิกฟรี 24 ชม.</span>
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
          * ข้อมูลนี้เป็นตัวอย่าง (mockup) ระบบจริงจะอัปเดตจากการจองแบบเรียลไทม์
        </p>
      </section>
    </div>
  );
}

export default CarDetail;
