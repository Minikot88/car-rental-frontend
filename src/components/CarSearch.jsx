import { useState } from "react";
import { DateRange } from "react-date-range";
import { carData } from "../data/cars";
import { getRentalDays } from "../utils/availability";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./styles/CarSearch.css";

/* ===== PURE DEFAULT DATES ===== */
const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TODAY.getDate() + 1);

export default function CarSearch({ onSearch }) {
  const [open, setOpen] = useState(false);

  const [range, setRange] = useState({
    startDate: TODAY,
    endDate: TOMORROW,
    key: "selection",
  });

  /* ===== rental days + price estimate ===== */
  const rentalDays = getRentalDays(
    range.startDate,
    range.endDate
  );

  const avgPrice =
    carData.reduce((sum, c) => sum + c.price, 0) / carData.length;

  const totalEstimate = Math.round(avgPrice * rentalDays);

  const handleSearch = () => {
    onSearch({
      pickupDate: range.startDate,
      returnDate: range.endDate,
    });
    setOpen(false);
  };

  return (
    <section className="search-hero dark">
      <div className="search-container">
        <h1 className="search-title">ค้นหารถที่ว่าง</h1>
        <p className="search-subtitle">
          เลือกวันรับ–คืนรถ เพื่อดูรถที่ว่างจริง
        </p>

        {/* ===== DATE INPUT ===== */}
        <div
          className="date-input"
          onClick={() => setOpen((v) => !v)}
        >
          📅 {range.startDate.toLocaleDateString()} –{" "}
          {range.endDate.toLocaleDateString()}
          <span className="arrow">{open ? "▲" : "▼"}</span>
        </div>

        {/* ===== CALENDAR ===== */}
        {open && (
          <div className="calendar-popup">
            <DateRange
              ranges={[range]}
              minDate={TODAY}
              onChange={(item) => {
                const { startDate, endDate } = item.selection;

                setRange({
                  startDate,
                  endDate:
                    endDate <= startDate
                      ? new Date(startDate.getTime() + 86400000)
                      : endDate,
                  key: "selection",
                });
              }}
            />
          </div>
        )}

        {/* ===== INFO BAR ===== */}
        <div className="info-bar">
          <span>
            💰 ประมาณการ:{" "}
            <strong>฿{totalEstimate.toLocaleString()}</strong>
          </span>
        </div>

        <button className="search-button" onClick={handleSearch}>
          🔍 ค้นหารถ
        </button>
      </div>
    </section>
  );
}
