import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import api from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";
import { SwalConfirm, SwalError } from "@/utils/swal";
import "./styles/CarDetail.css";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await api.get(
          `/cars/${id}/detail`,
          { skipLoading: true }
        );

        setCar(data);
      } catch {
        SwalError({ title: "ไม่พบข้อมูลรถ" });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  //////////////////////////////////////////////////////
  // BOOK BUTTON
  //////////////////////////////////////////////////////
  const handleBook = async () => {
    if (!user) {
      const result = await SwalConfirm({
        title: "กรุณาเข้าสู่ระบบก่อนทำการจอง",
        text: "คุณต้องการเข้าสู่ระบบตอนนี้หรือไม่ ?",
        confirmButtonText: "เข้าสู่ระบบ",
      });

      if (result.isConfirmed) {
        navigate("/login");
      }
      return;
    }

    navigate(`/booking/${car.id}`);
  };

  //////////////////////////////////////////////////////
  // UNAVAILABLE DATES
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

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading) return <p>กำลังโหลด...</p>;
  if (!car) return null;

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
          <img
            src={car.image || "/no-image.png"}
            alt={car.name}
          />
        </div>

        <div className="car-detail-info">
          <h1>{car.name}</h1>

          <div className="car-detail-rating">
            ⭐ {rating}
            <span>
              ({car.reviews?.length || 0} รีวิว)
            </span>
          </div>

          <div className="car-detail-meta">
            <span>🚘 {car.category}</span>
            <span>👥 {car.seats} ที่นั่ง</span>
            <span>⚙️ {car.transmission}</span>
          </div>

          <div className="car-detail-price">
            ฿{car.pricePerDay.toLocaleString()}
            <span>/วัน</span>
          </div>

          {car.status === "AVAILABLE" && (
            <button
              onClick={handleBook}
              className="btn btn-book"
            >
              จองรถคันนี้
            </button>
          )}
        </div>
      </div>

      {/* DETAIL */}
      <section className="car-detail-section car-detail-box">
        <h2>รายละเอียดรถ</h2>

        <div className="car-detail-grid">
          <Detail label="แบรนด์" value={car.brand} />
          <Detail label="รุ่น" value={car.model} />
          <Detail label="ปี" value={car.year} />
          <Detail label="เชื้อเพลิง" value={car.fuelType} />
          <Detail
            label="เลขไมล์"
            value={
              car.mileage
                ? `${car.mileage.toLocaleString()} กม.`
                : "-"
            }
          />
          <Detail
            label="เงินมัดจำ"
            value={`฿${car.deposit?.toLocaleString() || 0}`}
            highlight
          />
        </div>
      </section>

      {/* CALENDAR */}
      <section className="car-detail-section">
        <h2>สถานะรถทั้งปี</h2>

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

function Detail({ label, value, highlight }) {
  return (
    <div className={`detail-item ${highlight ? "highlight" : ""}`}>
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}