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
    <div className="carlist-page">
      {/* 🔍 Search */}
      <div className="carlist-search">
        <input
          type="text"
          placeholder="ค้นหารุ่นรถ หรือ ประเภทรถ"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button>ค้นหา</button>
      </div>

      {/* Result */}
      <p className="carlist-result">
        พบ {filteredCars.length} รายการ
      </p>

      {/* Grid */}
      <div className="carlist-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="carlist-card">
            {/* IMAGE SLOT (FIX HEIGHT) */}
            <div className="carlist-image-wrap">
              {car.img || car.image ? (
                <img
                  src={car.img || car.image}
                  alt={car.name}
                  loading="lazy"
                />
              ) : (
                <div className="carlist-image-placeholder">🚗</div>
              )}
            </div>

            {/* BODY */}
            <div className="carlist-body">
              <h3>{car.name}</h3>

              <p className="carlist-info">
                ประเภท: {car.type || "ไม่ระบุ"} • {car.seats || 5} ที่นั่ง
              </p>

              <div className="carlist-footer">
                <span className="carlist-price">
                  ฿{car.price.toLocaleString()}/วัน
                </span>

                <Link
                  to={`/cars/${car.id}`}
                  className="carlist-detail-btn"
                >
                  รายละเอียด
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
