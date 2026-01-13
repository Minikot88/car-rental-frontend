import { useState } from "react";
import "./styles/CarSearch.css";

export default function CarSearch({ onSearch }) {
  const [form, setForm] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = () => {
    onSearch?.(form);
  };

  return (
    <section className="search-hero">
      <div className="search-overlay" />

      <div className="search-container">
        <h1 className="search-title">ค้นหารถเช่า</h1>
        <p className="search-subtitle">
          เปรียบเทียบราคา ค้นหารถที่ใช่สำหรับคุณ
        </p>

        <div className="search-box">
          <input
            type="date"
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
          />

          <button onClick={handleSearch}>
            ค้นหาตอนนี้
          </button>
        </div>
      </div>
    </section>
  );
}
