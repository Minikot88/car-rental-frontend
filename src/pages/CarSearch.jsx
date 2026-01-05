// src/pages/CarSearch.jsx
import { useState } from "react";

export default function CarSearch({ onSearch }) {
  const [form, setForm] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = () => {
    onSearch(form);
  };

  return (
    <div style={styles.hero}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <h1 style={styles.title}>ค้นหารถเช่า</h1>
        <p style={styles.subtitle}>
          เปรียบเทียบราคา ค้นหารถที่ใช่สำหรับคุณ
        </p>

        <div style={styles.searchBox}>
          <input
            type="date"
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            style={styles.field}
          />

          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
            style={styles.field}
          />

          <button onClick={handleSearch} style={styles.ctaButton}>
            ค้นหาตอนนี้
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    position: "relative",
    width: "100%",
    height: "420px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  container: {
    position: "relative",
    textAlign: "center",
    color: "white",
    zIndex: 10,
    width: "100%",
    maxWidth: "960px",
    padding: "0 20px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  field: {
    flex: "1 1 180px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
  },

  ctaButton: {
    backgroundColor: "var(--primary)",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textTransform: "uppercase",
  },
};
