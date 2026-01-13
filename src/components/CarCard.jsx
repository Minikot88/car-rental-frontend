// src/components/CarCard.jsx
import { Link } from "react-router-dom";
import { contact } from "../data/cars";

export default function CarCard({ car }) {
  const image = car.image || "/assets/placeholder-car.jpg";

  return (
    <div style={styles.card}>
      <Link to={`/cars/${car.id || ""}`} style={styles.link}>
        <div style={styles.imageWrap}>
          <img src={image} alt={car.name} style={styles.image} loading="lazy" />
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

          <div style={styles.tagRow}>
            {(car.tags || []).slice(0, 2).map((t, i) => (
              <span key={i} style={styles.tag}>{t}</span>
            ))}
          </div>
        </div>
      </Link>

      <div style={styles.actions}>
        <a href={contact.line} target="_blank" rel="noreferrer" style={styles.contactLink}>
          ติดต่อ Line
        </a>

        <Link to={`/cars/${car.id}`} style={styles.selectButton}>
          เลือกเช่า
        </Link>
      </div>
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
  actions: {
    display: "flex",
    gap: 8,
    marginTop: 8,
  },
  contactLink: {
    padding: "8px 10px",
    background: "transparent",
    border: "1px solid var(--primary)",
    color: "var(--primary)",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  },
  selectButton: {
    padding: "8px 10px",
    backgroundColor: "var(--primary)",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 700,
    marginLeft: "auto",
  },
  tagRow: { marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" },
  tag: { fontSize: 12, color: "var(--text-muted)", background: "rgba(0,0,0,0.03)", padding: "4px 8px", borderRadius: 8 },
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
