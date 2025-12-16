// src/pages/CarDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    api.get(`/cars/${id}`).then((res) => setCar(res.data));
  }, []);

  if (!car) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{car.name}</h2>
      <img src={car.image} style={{ width: 350, borderRadius: 10 }} />

      <p>ประเภทรถ: {car.type}</p>
      <p>ราคา: {car.price} บาท/วัน</p>
      <p>รายละเอียด: {car.description}</p>

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
