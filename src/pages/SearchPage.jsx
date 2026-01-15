import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { carData } from "../data/cars";
import { isCarAvailable } from "../utils/availability";
import CarSearch from "../components/CarSearch";
import "./styles/Cars.css";

export default function SearchPage() {
  const [cars, setCars] = useState([]);
  const [searchInfo, setSearchInfo] = useState(null);
  const resultRef = useRef(null);

  const handleSearch = ({ pickupDate, returnDate }) => {
    const availableCars = carData.filter((car) =>
      isCarAvailable(car, pickupDate, returnDate)
    );

    setCars(availableCars);
    setSearchInfo({ pickupDate, returnDate });
  };

  useEffect(() => {
    if (searchInfo) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [searchInfo]);

  return (
    <>
      {/* 🔍 SEARCH */}
      <CarSearch onSearch={handleSearch} />

      {/* 📍 SCROLL TARGET */}
      <div ref={resultRef} />

      {/* ℹ️ SEARCH INFO */}
      {searchInfo && (
        <p style={{ textAlign: "center", margin: "20px 0" }}>
          ผลลัพธ์ระหว่างวันที่{" "}
          <strong>
            {searchInfo.pickupDate.toLocaleDateString()}
          </strong>{" "}
          –{" "}
          <strong>
            {searchInfo.returnDate.toLocaleDateString()}
          </strong>
        </p>
      )}

      {/* 🚗 RESULT LIST */}
      <div className="cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <img
              src={car.image || car.img}
              alt={car.name}
            />
            <h3>{car.name}</h3>
            <p>
              ฿{car.price.toLocaleString()} / วัน
            </p>

            <Link
              to={`/booking/${car.id}`}
              state={{
                start: searchInfo.pickupDate,
                end: searchInfo.returnDate,
              }}
            >
              จองรถ
            </Link>
          </div>
        ))}

        {searchInfo && cars.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 30 }}>
            ❌ ไม่มีรถว่างในช่วงวันที่เลือก
          </p>
        )}
      </div>
    </>
  );
}
