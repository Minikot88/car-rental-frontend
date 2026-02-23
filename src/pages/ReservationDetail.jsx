import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH RESERVATION
  //////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/reservations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReservation(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  //////////////////////////////////////////////////////
  // COUNTDOWN
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation?.lockExpiresAt) return;

    const expire = new Date(reservation.lockExpiresAt).getTime();

    const interval = setInterval(() => {
      const diff = expire - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        navigate("/my-bookings");
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation, navigate]);

  const formatTime = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) return <p style={{ textAlign: "center" }}>กำลังโหลด...</p>;
  if (!reservation) return <p>ไม่พบข้อมูล</p>;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>รายละเอียดใบจอง BL-{reservation.id}</h2>

      <div className="detail-card">
        <p>
          วันที่:{" "}
          {new Date(reservation.startDate).toLocaleDateString("th-TH")} →{" "}
          {new Date(reservation.endDate).toLocaleDateString("th-TH")}
        </p>
        <p>ยอดรวม: ฿{reservation.totalPrice.toLocaleString()}</p>
        <p>สถานะ: {reservation.status}</p>
        <p>Payment: {reservation.payment?.status || "-"}</p>
      </div>

      {["PENDING", "WAITING_PAYMENT"].includes(reservation.status) && (
        <div className="detail-card">
          <h3>รอชำระเงิน</h3>

          <h2 style={{ color: "red" }}>
            เวลาคงเหลือ: {formatTime(timeLeft)}
          </h2>

          <Link
            to={`/payment/${reservation.id}`}
            className="btn-primary"
          >
            ไปหน้าชำระเงิน
          </Link>
        </div>
      )}
    </div>
  );
}