import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CarSearch from "../components/CarSearch";
import "./styles/cars.css";

const API = import.meta.env.VITE_API_URL;

export default function SearchPage() {
  const [cars, setCars] = useState([]);
  const [searchInfo, setSearchInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const resultRef = useRef(null);

  //////////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////////
  const handleSearch = async ({ pickupDate, returnDate }) => {
    try {
      setLoading(true);
      setSearched(true);
      setCars([]);

      const res = await axios.get(`${API}/cars/available`, {
        params: {
          startDate: pickupDate,
          endDate: returnDate,
        },
      });

      setCars(res.data);
      setSearchInfo({ pickupDate, returnDate });

    } catch (err) {
      console.error(err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // SCROLL TO RESULT
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (searchInfo) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [searchInfo]);

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <>
      <CarSearch onSearch={handleSearch} />

      <div ref={resultRef} />

      {searchInfo && (
        <p style={{ textAlign: "center", margin: "20px 0" }}>
          ผลลัพธ์ระหว่างวันที่{" "}
          <strong>
            {new Date(searchInfo.pickupDate).toLocaleDateString()}
          </strong>{" "}
          –{" "}
          <strong>
            {new Date(searchInfo.returnDate).toLocaleDateString()}
          </strong>
        </p>
      )}

      {loading && (
        <p style={{ textAlign: "center" }}>
          🔄 กำลังค้นหารถว่าง...
        </p>
      )}

      {/* 🚗 RESULT */}
      {!loading && cars.length > 0 && (
        <div className="cars-grid">
          {cars.map((car) => {
            const isLocked = car.isLocked;
            const lockTime = car.lockExpiresAt
              ? new Date(car.lockExpiresAt)
              : null;

            return (
              <div className="car-card" key={car.id}>
                <img
                  src={car.image || "/no-image.png"}
                  alt={car.name}
                />

                <h3>{car.name}</h3>

                <p>
                  ฿{car.pricePerDay.toLocaleString()} / วัน
                </p>

                {/* 🔒 ถ้ารถกำลังถูกจอง */}
                {isLocked ? (
                  <>
                    <button className="btn-locked" disabled>
                      🔒 มีผู้จองอยู่
                    </button>

                    {lockTime && (
                      <small
                        style={{
                          display: "block",
                          marginTop: "6px",
                          color: "red",
                        }}
                      >
                        ถูกจองชั่วคราวถึง{" "}
                        {lockTime.toLocaleTimeString("th-TH")}
                      </small>
                    )}
                  </>
                ) : (
                  <Link
                    to={`/booking/${car.id}`}
                    state={{
                      start: searchInfo.pickupDate,
                      end: searchInfo.returnDate,
                    }}
                    className="btn-book"
                  >
                    จองรถ
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ❌ NO RESULT */}
      {!loading && searched && cars.length === 0 && (
        <div className="no-result">
          <h3>❌ ไม่มีรถว่าง</h3>
          <p>
            กรุณาเลือกช่วงวันอื่น หรือปรับวันที่เช่าใหม่
          </p>
        </div>
      )}
    </>
  );
}
