import { Link } from "react-router-dom";
import { contact } from "../data/cars";
import "./styles/CarCard.css";

export default function CarCard({ car }) {
  const image = car.image || "/assets/placeholder-car.jpg";

  return (
    <div className="car-card">
      <Link to={`/cars/${car.id || ""}`} className="car-link">
        <div className="car-image-wrap">
          <img
            src={image}
            alt={car.name}
            className="car-image"
            loading="lazy"
          />

          <div className="price-badge">
            <div className="price-badge-value">
              ฿{car.price.toLocaleString()}
            </div>
            <div className="price-badge-unit">/ วัน</div>
          </div>
        </div>

        <div className="car-body">
          <h4 className="car-name">{car.name}</h4>

          <div className="car-meta">
            <span>🚗 {car.type || "ไม่ระบุ"}</span>
            <span>👥 {car.seats || 5}</span>
          </div>

          <div className="car-tags">
            {(car.tags || []).slice(0, 2).map((t, i) => (
              <span key={i} className="car-tag">{t}</span>
            ))}
          </div>
        </div>
      </Link>

      <div className="car-actions">
        <a
          href={contact.line}
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
        >
          ติดต่อ Line
        </a>

        <Link to={`/cars/${car.id}`} className="btn-primary">
          เลือกเช่า
        </Link>
      </div>
    </div>
  );
}
