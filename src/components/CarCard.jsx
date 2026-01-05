// src/components/CarCard.jsx
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  const image = car.image || "/assets/placeholder-car.jpg";

  return (
    <div style={styles.card}>
      <Link to={`/cars/${car.id || ""}`} style={styles.link}>
        <div style={styles.imageWrap}>
          <img src={image} alt={car.name} style={styles.image} />
          <div style={styles.badge}>
            <div style={styles.badgePrice}>฿{car.price.toLocaleString()}</div>
            <div style={styles.badgeUnit}>/ วัน</div>
          </div>
        </div>

        <div style={styles.body}>
          <h4 style={styles.name}>{car.name}</h4>
          <div style={styles.meta}>
            <span style={styles.metaItem}>🚗 {car.type || "ไม่ระบุ"}</span>
            <span style={styles.metaItem}>👥 {car.seats || 5}</span>
          </div>
        </div>
      </Link>

      <button style={styles.button}>เลือกเช่า</button>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--card)",
    borderRadius: "14px",
    boxShadow: "0 6px 22px rgba(12,13,14,0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "8px",
    transition: "transform .14s ease, box-shadow .14s ease",
    willChange: "transform",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    display: "block",
  },
  name: {
    fontSize: "16px",
    fontWeight: 700,
    margin: "10px 0 4px",
    color: "#222",
  },
  price: {
    display: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: 10,
    fontWeight: 700,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  imageWrap: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 8,
    background: "linear-gradient(90deg,var(--primary),var(--primary-2))",
    color: "white",
    padding: "6px 8px",
    borderRadius: 8,
    textAlign: "right",
    boxShadow: "0 6px 18px rgba(255,0,0,0.12)",
  },
  badgePrice: {
    fontWeight: 900,
    fontSize: 14,
    lineHeight: 1,
  },
  badgeUnit: {
    fontSize: 11,
    opacity: 0.9,
    marginTop: 2,
  },
  body: {
    padding: "8px 6px",
  },
  meta: {
    display: "flex",
    gap: 10,
    color: "#666",
    fontSize: 13,
    marginTop: 6,
  },
  metaItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
};
