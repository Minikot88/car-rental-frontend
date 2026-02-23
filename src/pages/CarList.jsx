import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/CarList.css";

const API = import.meta.env.VITE_API_URL;

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const res = await axios.get(`${API}/cars`);
      setCars(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredCars = cars.filter((car) =>
    `${car.name} ${car.category}`
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  function getStatusBadge(status) {
    if (status === "AVAILABLE")
      return <span className="success">🟢 ว่าง</span>;

    if (status === "BOOKED")
      return <span className="warning">🟡 ถูกจอง</span>;

    if (status === "MAINTENANCE")
      return <span className="danger">🔴 ซ่อมบำรุง</span>;

    return <span>{status}</span>;
  }

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <div className="carlist-layout">
      <main className="carlist-page">

        {/* SEARCH */}
        <div className="carlist-search">
          <input
            type="text"
            placeholder="ค้นหารุ่นรถ หรือ ประเภทรถ"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <p className="carlist-result">
          พบ {filteredCars.length} รายการ
        </p>

        <div className="carlist-grid">
          {filteredCars.map((car) => (
            <div key={car.id} className="carlist-card">

              {/* IMAGE */}
              <div className="carlist-image-wrap">
                <img
                  src={car.image || "/no-image.png"}
                  alt={car.name}
                />
              </div>

              {/* INFO */}
              <div className="carlist-info-wrap">
                <h3 className="car-name">{car.name}</h3>

                <div className="car-meta">
                  <span>🚘 {car.category}</span>
                  <span>👥 {car.seats} ที่นั่ง</span>
                  <span>⚙️ {car.transmission}</span>
                </div>

                <div className="car-pickup">
                  📍 รับรถ: {car.location || "สนามบิน"}
                </div>

                <div className="car-availability">
                  {getStatusBadge(car.status)}
                </div>
              </div>

              {/* PRICE */}
              <div className="carlist-price-wrap">
                <div className="price-label">ราคา / วัน</div>
                <div className="car-price">
                  ฿{car.pricePerDay.toLocaleString()}
                </div>

                {car.status === "AVAILABLE" ? (
                  <Link
                    to={`/booking/${car.id}`}
                    className="carlist-detail-btn"
                  >
                    จองเลย
                  </Link>
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
          ))}
        </div>
      </main>
    </div>
  );
}
