// src/pages/CarList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { carData } from "../data/cars";

export default function CarList() {
  const [keyword, setKeyword] = useState("");

  const filteredCars = carData.filter((car) =>
    car.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* 🔍 Search Bar */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="ค้นหารุ่นรถ หรือ ประเภทรถ"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.searchInput}
        />

        <button style={styles.searchButton}>ค้นหา</button>
      </div>

      {/* 📋 Result */}
      <p style={styles.resultText}>
        พบ {filteredCars.length} รายการ
      </p>

      {/* 🚗 List */}
      <div style={styles.list}>
        {filteredCars.map((car) => (
          <div key={car.id} style={styles.card}>
            <img src={car.img} alt={car.name} style={styles.image} />

            <div style={styles.body}>
              <h3 style={styles.title}>{car.name}</h3>

              <p style={styles.info}>
                ประเภท: {car.type} • {car.seats} ที่นั่ง
              </p>

              <div style={styles.footer}>
                <span style={styles.price}>
                  ฿{car.price.toLocaleString()}/วัน
                </span>

                <Link to={`/cars/${car.id}`} style={styles.button}>
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  page: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  },

  /* Search */
  searchBox: {
    display: "flex",
    gap: "10px",
    background: "var(--card)",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  searchInput: {
    flex: 1,
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  searchButton: {
    padding: "12px 22px",
    backgroundColor: "var(--primary)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  resultText: {
    marginBottom: "15px",
    color: "#555",
    fontSize: "14px",
  },

  /* List */
  list: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  },

  card: {
    backgroundColor: "var(--card)",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },

  body: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },

  info: {
    fontSize: "14px",
    color: "#666",
  },

  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--primary)",
  },

  button: {
    padding: "8px 14px",
    backgroundColor: "var(--primary)",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
    textDecoration: "none",
  },
};
