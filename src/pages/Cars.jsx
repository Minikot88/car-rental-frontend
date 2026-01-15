import { useState, useEffect, useRef } from "react";
import { carData } from "../data/cars";
import { isCarAvailable } from "../utils/availability";
import CarSearch from "../components/CarSearch";
import { Link } from "react-router-dom";
import "./styles/Cars.css";

export default function Cars() {
  const [cars, setCars] = useState(carData);
  const [searchInfo, setSearchInfo] = useState(null);
  const resultRef = useRef(null);

  const handleSearch = ({ pickupDate, returnDate }) => {
    console.log("SEARCH:", pickupDate, returnDate); // 🔍 debug

    const availableCars = carData.filter((car) =>
      isCarAvailable(car, pickupDate, returnDate)
    );

    setCars(availableCars);              // ✅ สำคัญ
    setSearchInfo({ pickupDate, returnDate }); // ✅ สำคัญ
  };

  /* ===== auto scroll เมื่อค้นหา ===== */
  useEffect(() => {
    if (searchInfo) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [searchInfo]);

  return (
    <>
      {/* ===== SEARCH ===== */}
      <CarSearch onSearch={handleSearch} />

      {/* ===== RESULT ANCHOR ===== */}
      <div ref={resultRef} />

      {/* ===== SEARCH INFO ===== */}
      {searchInfo && (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          ผลลัพธ์ระหว่างวันที่{" "}
          <strong>{searchInfo.pickupDate.toLocaleDateString()}</strong>{" "}
          –{" "}
          <strong>{searchInfo.returnDate.toLocaleDateString()}</strong>
        </p>
      )}

      {/* ===== CARS ===== */}
      <div className="cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <p>฿{car.price.toLocaleString()} / วัน</p>

            <Link to={`/booking/${car.id}`}>
              จองรถ
            </Link>
          </div>
        ))}

        {cars.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 30 }}>
            ❌ ไม่มีรถว่างในช่วงวันที่เลือก
          </p>
        )}
      </div>
    </>
  );
}
