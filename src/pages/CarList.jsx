import { useState } from "react";
import { Link } from "react-router-dom";
import { carData } from "../data/cars";
import "./styles/CarList.css";

export default function CarList() {
  const [keyword, setKeyword] = useState("");

  const filteredCars = carData.filter((car) =>
    car.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="carlist-layout">
      {/* ========== MAIN ========== */}
      <main className="carlist-page">
        {/* Search */}
        <div className="carlist-search">
          <input
            type="text"
            placeholder="ค้นหารุ่นรถ หรือ ประเภทรถ"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button>ค้นหา</button>
        </div>

        <p className="carlist-result">
          พบ {filteredCars.length} รายการ
        </p>

        <div className="carlist-grid">
          {filteredCars.map((car, i) => (
            <div key={car.id} className="carlist-card">
              {/* IMAGE */}
              <div className="carlist-image-wrap">
                <img src={car.image} alt={car.name} />
              </div>

              {/* INFO */}
              <div className="carlist-info-wrap">
                <h3 className="car-name">{car.name}</h3>

                {/* ⭐ Rating */}
                <div className="car-rating">
                  ⭐ 4.{(i % 5) + 3} ( {20 + i * 3} รีวิว )
                </div>

                <div className="car-meta">
                  <span>🚘 {car.type}</span>
                  <span>👥 {car.seats} ที่นั่ง</span>
                  <span>⚙️ {car.transmission}</span>
                </div>

                {/* 📍 Pickup */}
                <div className="car-pickup">
                  📍 รับรถ: สนามบิน / สำนักงาน
                </div>

                {/* 🟢 Availability */}
                <div className="car-availability">
                  {i % 4 === 0 ? (
                    <span className="danger">❗ เหลือ 1 คัน</span>
                  ) : (
                    <span className="success">🟢 รถว่าง</span>
                  )}
                </div>

                {/* ❌ Policy */}
                <div className="car-policy">
                  ❌ ยกเลิกฟรีภายใน 24 ชม.
                </div>
              </div>

              {/* PRICE */}
              <div className="carlist-price-wrap">
                <div className="price-label">ราคา / วัน</div>
                <div className="car-price">
                  ฿{car.price.toLocaleString()}
                </div>

                <Link
                  to={`/carsdetail/${car.id}`}
                  className="carlist-detail-btn"
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
