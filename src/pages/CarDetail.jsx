// src/pages/CarDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { carData } from "../data/cars";

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
        // fallback to local data
        const found = carData.find((c) => c.id === id);
        if (!cancelled) setCar(found || null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!car) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{car.name}</h2>
      <img src={car.image || car.img} style={{ width: 350, borderRadius: 10 }} alt={car.name} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: car.name,
          image: [car.image || car.img],
          description: car.description || `${car.type} รถเช่า`,
          offers: {
            "@type": "Offer",
            price: car.price,
            priceCurrency: "THB",
          },
        })}
      </script>

      <p>ประเภทรถ: {car.type}</p>
      <p>ราคา: {car.price} บาท/วัน</p>
      <p>รายละเอียด: {car.description || "-"}</p>

      <Link to={`/booking/${car.id}`} style={styles.button}>
        จองรถคันนี้
      </Link>
    </div>
  );
}

export default CarDetail;

const styles = {
  button: {
    display: "inline-block",
    marginTop: 20,
    padding: "10px 15px",
    background: "#007bff",
    color: "#fff",
    borderRadius: 5,
    textDecoration: "none",
  },
};
