import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./styles/CarDetail.css";

const API = import.meta.env.VITE_API_URL;

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ เลือกปีได้
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/cars/${id}/detail`);
        setCar(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  //////////////////////////////////////////////////////
  // รวมวันไม่ว่าง
  //////////////////////////////////////////////////////
  const unavailableDates = useMemo(() => {
    if (!car?.reservations) return [];

    const dates = [];

    car.reservations.forEach((r) => {
      let current = new Date(r.startDate);
      const end = new Date(r.endDate);

      while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    return dates;
  }, [car]);

  //////////////////////////////////////////////////////
  // RATING
  //////////////////////////////////////////////////////
  const rating = useMemo(() => {
    if (!car?.reviews?.length) return "4.5";
    const avg =
      car.reviews.reduce((a, b) => a + b.rating, 0) /
      car.reviews.length;
    return avg.toFixed(1);
  }, [car]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (!car) return <p>❌ ไม่พบข้อมูลรถ</p>;

  const todayStr = new Date().toISOString().split("T")[0];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="car-detail-page">

      {/* HERO */}
      <div className="car-detail-hero">
        <div className="car-detail-image-wrap">
          <img src={car.image || "/no-image.png"} alt={car.name} />
        </div>

        <div className="car-detail-info">
          <h1>{car.name}</h1>

          <div className="car-detail-rating">
            ⭐ {rating}
            <span> ({car.reviews?.length || 0} รีวิว)</span>
          </div>

          <div className="car-detail-meta">
            <span>🚘 {car.category}</span>
            <span>👥 {car.seats} ที่นั่ง</span>
            <span>⚙️ {car.transmission}</span>
          </div>

          <div className="car-detail-price">
            ฿{car.pricePerDay.toLocaleString()} <span>/วัน</span>
          </div>

          {car.status === "AVAILABLE" && (
            <Link
              to={`/booking/${car.id}`}
              className="btn-primary"
            >
              จองรถคันนี้
            </Link>
          )}
        </div>
      </div>

      {/* YEAR SELECT */}
      <section className="car-detail-section">
        <h2>สถานะรถทั้งปี</h2>

        <div style={{ marginBottom: 20 }}>
          <label>เลือกปี: </label>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
        </div>

        <div className="year-calendar">
          {months.map((month) => {
            const monthStr =
              `${selectedYear}-${String(month).padStart(2, "0")}`;

            const daysInMonth =
              new Date(selectedYear, month, 0).getDate();

            return (
              <div key={month} className="month-block">
                <h3>
                  {new Date(selectedYear, month - 1)
                    .toLocaleString("th-TH", { month: "long" })}
                </h3>

                <div className="availability-grid">
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr =
                      `${monthStr}-${String(day).padStart(2, "0")}`;

                    const isUnavailable =
                      unavailableDates.includes(dateStr);

                    return (
                      <div
                        key={day}
                        className={`availability-day
                          ${isUnavailable ? "unavailable" : "available"}
                          ${dateStr === todayStr ? "today" : ""}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
