import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";
import { SwalConfirm } from "@/utils/swal";
import "./styles/CarList.css";

export default function CarList() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //////////////////////////////////////////////////////
  // LOAD CARS
  //////////////////////////////////////////////////////
  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      setLoading(true);

      const res = await api.get("/cars/public", {
        skipLoading: true,
      });

      setCars(res.data);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถโหลดข้อมูลรถได้");
    } finally {
      setLoading(false);
    }
  }

  //////////////////////////////////////////////////////
  // BOOK HANDLER
  //////////////////////////////////////////////////////
  const handleBook = async (carId) => {
    if (!user) {
      const result = await SwalConfirm({
        title: "กรุณาเข้าสู่ระบบก่อนทำการจอง",
        text: "คุณต้องการเข้าสู่ระบบตอนนี้หรือไม่ ?",
        confirmButtonText: "เข้าสู่ระบบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        navigate("/login");
      }
      return;
    }

    navigate(`/booking/${carId}`);
  };

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////
  const filteredCars = cars.filter((car) =>
    `${car.name} ${car.category} ${car.brand} ${car.model}`
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  //////////////////////////////////////////////////////
  // BADGE
  //////////////////////////////////////////////////////
  function getStatusBadge(status) {
    switch (status) {
      case "AVAILABLE":
        return <span className="badge success">🟢 ว่าง</span>;
      case "BOOKED":
        return <span className="badge warning">🟡 ถูกจอง</span>;
      case "MAINTENANCE":
        return <span className="badge danger">🔴 ซ่อมบำรุง</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  }

  //////////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////////
  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>{error}</p>;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="carlist-layout">
      <main className="carlist-page">

        <div className="carlist-search">
          <input
            type="text"
            placeholder="ค้นหารุ่นรถ / ยี่ห้อ / ประเภทรถ"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <p>พบ {filteredCars.length} รายการ</p>

        <div className="carlist-grid">
          {filteredCars.map((car) => {
            const vatPercent = car.vatPercent ?? 7;
            const vatAmount =
              (car.pricePerDay || 0) * vatPercent / 100;

            return (
              <div key={car.id} className="carlist-card">

                {/* IMAGE */}
                <div className="carlist-image-wrap">
                  {car.image ? (
                    <img src={car.image} alt={car.name} />
                  ) : (
                    <div className="carlist-image-placeholder">
                      🚗
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="carlist-info-wrap">
                  <h3 className="car-name">
                    {car.brand} {car.model}
                  </h3>

                  <div className="car-meta">
                    <span>🚘 {car.category}</span>
                    <span>👥 {car.seats} ที่นั่ง</span>
                    <span>⚙️ {car.transmission}</span>
                    <span>⛽ {car.fuelType}</span>
                  </div>

                  <div className="car-pickup">
                    📍 รับรถ: {car.location || "สนามบิน"}
                  </div>

                  <div className="car-availability">
                    {getStatusBadge(car.status)}
                  </div>

                  {car.deposit > 0 && (
                    <div className="car-deposit">
                      💰 มัดจำ: ฿{car.deposit.toLocaleString()}
                    </div>
                  )}

                  {car.isDepositWaivable && (
                    <div className="deposit-note">
                      ✈️ ฟรีมัดจำเมื่อแสดงตั๋วเครื่องบิน
                    </div>
                  )}
                </div>

                {/* PRICE */}
                <div className="carlist-price-wrap">
                  <div className="price-label">ราคา / วัน</div>

                  <div className="car-price">
                    ฿{car.pricePerDay?.toLocaleString() || "0"}
                  </div>

                  <div className="vat-info">
                    (รวม VAT {vatPercent}% = ฿
                    {vatAmount.toFixed(0)})
                  </div>

                  {car.status === "AVAILABLE" ? (
                    <button
                      onClick={() => handleBook(car.id)}
                      className="carlist-detail-btn"
                    >
                      จองเลย
                    </button>
                  ) : (
                    <button
                      className="carlist-detail-btn disabled"
                      disabled
                    >
                      ไม่ว่าง
                    </button>
                  )}

                  <Link
                    to={`/carsdetail/${car.id}`}
                    className="carlist-detail-btn outline"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}