import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Waiting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    let interval;

    async function fetchStatus() {
      try {
        const res = await axios.get(
          `${API}/reservations/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReservation(res.data);

        if (res.data.status === "CONFIRMED") {
          clearInterval(interval);
          alert("✅ การชำระเงินสำเร็จ");
          navigate(`/reservations/${id}`);
        }

      } catch (err) {
        console.error(err);
      }
    }

    fetchStatus();
    interval = setInterval(fetchStatus, 5000); // 🔄 ทุก 5 วิ

    return () => clearInterval(interval);

  }, [id, navigate, token]);

  if (!reservation)
    return <p style={{ textAlign: "center" }}>กำลังตรวจสอบ...</p>;

  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h2>⏳ รอการตรวจสอบการชำระเงิน</h2>

      <h3>เลขที่รายการ BL-{reservation.id}</h3>
      <p>สถานะปัจจุบัน: {reservation.status}</p>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: "#f3f4f6",
          borderRadius: 10,
        }}
      >
        ระบบจะรีเฟรชอัตโนมัติทุก 5 วินาที
      </div>
    </div>
  );
}
