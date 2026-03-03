import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/axios";
import CarSearch from "../components/CarSearch";
import { SwalConfirm } from "@/utils/swal";
import "./styles/cars.css";

export default function SearchPage() {
  const [cars, setCars] = useState([]);
  const [searchInfo, setSearchInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const resultRef = useRef(null);
  const navigate = useNavigate();

  //////////////////////////////////////////////////////
  // CHECK LOGIN (cookie session)
  //////////////////////////////////////////////////////
  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const res = await api.get("/auth/me", {
          skipLoading: true,
        });

        if (mounted) {
          setIsLoggedIn(!!res.data?.user);
        }
      } catch {
        if (mounted) setIsLoggedIn(false);
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  //////////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////////
  const handleSearch = useCallback(async ({ pickupDate, returnDate }) => {
    try {
      setLoading(true);
      setSearched(true);
      setCars([]);

      const res = await api.get("/cars/available", {
        params: {
          startDate: pickupDate,
          endDate: returnDate,
        },
      });

      setCars(res.data || []);
      setSearchInfo({ pickupDate, returnDate });

    } catch (err) {
      console.error("SEARCH ERROR:", err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
  // BOOK
  //////////////////////////////////////////////////////
  const handleBook = async (car) => {
    if (!isLoggedIn) {
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

    navigate(`/booking/${car.id}`, {
      state: {
        start: searchInfo?.pickupDate,
        end: searchInfo?.returnDate,
      },
    });
  };

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
            {new Date(searchInfo.pickupDate).toLocaleDateString("th-TH")}
          </strong>{" "}
          –{" "}
          <strong>
            {new Date(searchInfo.returnDate).toLocaleDateString("th-TH")}
          </strong>
        </p>
      )}

      {loading && (
        <p style={{ textAlign: "center" }}>
          🔄 กำลังค้นหารถว่าง...
        </p>
      )}

      {/* RESULTS */}
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
                  <button
                    onClick={() => handleBook(car)}
                    className="btn-book"
                  >
                    จองรถ
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* NO RESULT */}
      {!loading && searched && cars.length === 0 && (
        <div className="no-result">
          <h3>❌ ไม่มีรถว่าง</h3>
          <p>กรุณาเลือกช่วงวันอื่น หรือปรับวันที่เช่าใหม่</p>
        </div>
      )}
    </>
  );
}