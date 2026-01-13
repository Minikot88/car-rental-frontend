import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { carData } from "../data/cars";
import "./styles/CarDetail.css";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    let cancelled = false;

    api
      .get(`/cars/${id}`)
      .then((res) => {
        if (!cancelled) setCar(res.data);
      })
      .catch(() => {
        const found = carData.find((c) => String(c.id) === String(id));
        if (!cancelled) setCar(found || null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!car) {
    return <p className="car-detail-loading">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="car-detail-page">
      <div className="car-detail-card">
        {/* IMAGE */}
        <div className="car-detail-image-wrap">
          {car.image || car.img ? (
            <img
              src={car.image || car.img}
              alt={car.name}
              loading="lazy"
            />
          ) : (
            <div className="car-detail-image-placeholder">🚗</div>
          )}
        </div>

        {/* INFO */}
        <div className="car-detail-info">
          <h1 className="car-detail-title">{car.name}</h1>

          <p className="car-detail-meta">
            ประเภทรถ: <strong>{car.type || "ไม่ระบุ"}</strong> •{" "}
            {car.seats || 5} ที่นั่ง
          </p>

          <div className="car-detail-price">
            ฿{car.price.toLocaleString()}
            <span>/วัน</span>
          </div>

          <div className="car-detail-desc">
            {car.description || "ไม่มีรายละเอียดเพิ่มเติม"}
          </div>

          <Link
            to={`/booking/${car.id}`}
            className="car-detail-book-btn"
          >
            จองรถคันนี้
          </Link>
        </div>
      </div>

      {/* SEO STRUCTURED DATA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: car.name,
          image: [car.image || car.img].filter(Boolean),
          description: car.description || `${car.type || ""} รถเช่า`,
          offers: {
            "@type": "Offer",
            price: car.price,
            priceCurrency: "THB",
            availability: "https://schema.org/InStock",
          },
        })}
      </script>
    </div>
  );
}

export default CarDetail;
