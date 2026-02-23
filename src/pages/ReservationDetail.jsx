import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

const API = import.meta.env.VITE_API_URL;
const PROMPTPAY_ID = "0936400172";

export default function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH DATA
  //////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/reservations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReservation(res.data);

        if (res.data.status === "PENDING") {
          const payload = generatePayload(PROMPTPAY_ID, {
            amount: res.data.totalPrice,
          });
          QRCode.toDataURL(payload).then(setQrCode);
        }

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
        setTimeLeft(0);
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

  //////////////////////////////////////////////////////
  // TIMELINE STATUS
  //////////////////////////////////////////////////////
  const getStep = () => {
    switch (reservation?.status) {
      case "PENDING":
        return 1;
      case "WAITING_PAYMENT":
        return 2;
      case "CONFIRMED":
        return 3;
      case "COMPLETED":
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = getStep();

  if (loading) return <p style={{ textAlign: "center" }}>กำลังโหลด...</p>;
  if (!reservation) return <p>ไม่พบข้อมูล</p>;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>รายละเอียดใบจอง BL-{reservation.id}</h2>

      {/* 🔥 Timeline */}
      <div className="timeline">
        {["สร้างใบจอง", "ชำระเงิน", "ยืนยันแล้ว", "เสร็จสิ้น"].map(
          (label, index) => (
            <div
              key={index}
              className={`timeline-step ${
                currentStep >= index + 1 ? "active" : ""
              }`}
            >
              <div className="circle">{index + 1}</div>
              <span>{label}</span>
            </div>
          )
        )}
      </div>

      {/* 🔥 Reservation Info */}
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

      {/* 🔥 QR Invoice ถ้ายังจองอยู่ */}
      {reservation.status === "PENDING" && (
        <div className="detail-card">
          <h3>Invoice (QR Code)</h3>

          <h2 style={{ color: "red" }}>
            เวลาคงเหลือ: {formatTime(timeLeft)}
          </h2>

          {qrCode && (
            <img
              src={qrCode}
              alt="QR Code"
              style={{ width: 250 }}
            />
          )}

          <Link
            to="/payment"
            state={{
              reservation,
              totalPrice: reservation.totalPrice,
            }}
            className="btn-primary"
          >
            ชำระเงินต่อ
          </Link>
        </div>
      )}
    </div>
  );
}
