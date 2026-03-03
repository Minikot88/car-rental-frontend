import { useState, useRef, useEffect, useMemo } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./styles/CarSearch.css";

/* ===== DEFAULT DATES ===== */
const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TODAY.getDate() + 1);

/* ===== ราคาเฉลี่ยต่อวัน (ประมาณการ) ===== */
const AVG_PRICE = 1200;

export default function CarSearch({ onSearch }) {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef();

  const [range, setRange] = useState({
    startDate: TODAY,
    endDate: TOMORROW,
    key: "selection",
  });

  //////////////////////////////////////////////////////
  // ปิด popup เมื่อคลิกข้างนอก
  //////////////////////////////////////////////////////
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  //////////////////////////////////////////////////////
  // คำนวณจำนวนวัน
  //////////////////////////////////////////////////////
  const rentalDays = useMemo(() => {
    const diff =
      (range.endDate - range.startDate) /
      (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 1;
  }, [range]);

  //////////////////////////////////////////////////////
  // คำนวณราคาโดยประมาณ
  //////////////////////////////////////////////////////
  const estimatedPrice = useMemo(() => {
    return rentalDays * AVG_PRICE;
  }, [rentalDays]);

  //////////////////////////////////////////////////////
  const handleSearch = () => {
    onSearch({
      pickupDate: range.startDate.toISOString(),
      returnDate: range.endDate.toISOString(),
    });

    setOpen(false);
  };

  //////////////////////////////////////////////////////
  return (
    <section className="search-hero">
      <div className="search-container">
        <h1 className="search-title">ค้นหารถที่ว่าง</h1>
        <p className="search-subtitle">
          เลือกวันรับ–คืนรถ เพื่อดูรถที่ว่างจริง
        </p>

        {/* DATE INPUT */}
        <div
          className="date-input"
          onClick={() => setOpen((v) => !v)}
        >
          📅 {range.startDate.toLocaleDateString("th-TH")} –{" "}
          {range.endDate.toLocaleDateString("th-TH")}
          <span className="arrow">
            {open ? "▲" : "▼"}
          </span>
        </div>

        {/* CALENDAR */}
        {open && (
          <div
            className="calendar-popup fade-in"
            ref={calendarRef}
          >
            <DateRange
              ranges={[range]}
              minDate={TODAY}
              rangeColors={["#3b82f6"]}
              onChange={(item) => {
                const { startDate, endDate } =
                  item.selection;

                setRange({
                  startDate,
                  endDate:
                    endDate <= startDate
                      ? new Date(
                          startDate.getTime() +
                            86400000
                        )
                      : endDate,
                  key: "selection",
                });
              }}
            />
          </div>
        )}

        {/* INFO BAR */}
        <div className="info-bar">
          <span>
            📆 {rentalDays} วัน
          </span>

          <span>
            💰 ประมาณการ: ฿
            {estimatedPrice.toLocaleString()}
          </span>
        </div>

        <button
          className="search-button"
          onClick={handleSearch}
        >
          🔍 ค้นหารถ
        </button>
      </div>
    </section>
  );
}