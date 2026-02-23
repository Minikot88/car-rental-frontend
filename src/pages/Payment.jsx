import {
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

const API = import.meta.env.VITE_API_URL;
const PROMPTPAY_ID = "0936400172";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [reservation, setReservation] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  //////////////////////////////////////////////////////
  // 1️⃣ FETCH RESERVATION (รองรับ refresh)
  //////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchReservation() {
      try {
        if (!id) {
          setPageLoading(false);
          return;
        }

        const res = await axios.get(
          `${API}/reservations/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setReservation(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    }

    fetchReservation();
  }, [id]);

  //////////////////////////////////////////////////////
  // 2️⃣ REDIRECT IF STATUS NOT ALLOWED
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation) return;

    if (reservation.status === "CONFIRMED") {
      navigate(`/reservations/${reservation.id}`);
    }

    if (
      reservation.status === "CANCELLED" ||
      reservation.status === "EXPIRED"
    ) {
      navigate("/carslist");
    }
  }, [reservation, navigate]);

  //////////////////////////////////////////////////////
  // 3️⃣ GENERATE QR
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation) return;

    const payload = generatePayload(PROMPTPAY_ID, {
      amount: reservation.totalPrice,
    });

    QRCode.toDataURL(payload).then(setQrCode);
  }, [reservation]);

  //////////////////////////////////////////////////////
  // 4️⃣ COUNTDOWN TIMER
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation?.lockExpiresAt) return;

    const expireTime = new Date(
      reservation.lockExpiresAt
    ).getTime();

    const interval = setInterval(() => {
      const diff = expireTime - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        alert("หมดเวลาชำระเงิน");
        navigate("/carslist");
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation, navigate]);

  //////////////////////////////////////////////////////
  // FORMAT TIME
  //////////////////////////////////////////////////////
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  //////////////////////////////////////////////////////
  // CONFIRM PAYMENT
  //////////////////////////////////////////////////////
  const handleConfirm = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${API}/payments/confirm`,
        {
          reservationId: reservation.id,
          method: "QR",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/waiting/${reservation.id}`);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "เกิดข้อผิดพลาด"
      );
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // RENDER GUARD
  //////////////////////////////////////////////////////
  if (pageLoading)
    return <p style={{ textAlign: "center" }}>กำลังโหลด...</p>;

  if (!reservation)
    return <Navigate to="/carslist" />;

  //////////////////////////////////////////////////////
  // ALLOW CONFIRM?
  //////////////////////////////////////////////////////
  const canConfirm =
    reservation.status === "PENDING" ||
    reservation.status === "WAITING_PAYMENT";

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h2>ชำระเงินผ่าน PromptPay</h2>

      <h3>BL-{reservation.id}</h3>
      <h3>
        ยอดชำระ: ฿
        {reservation.totalPrice.toLocaleString()}
      </h3>

      {reservation.lockExpiresAt && (
        <h2 style={{ color: "red" }}>
          เวลาคงเหลือ: {formatTime(timeLeft)}
        </h2>
      )}

      {qrCode && (
        <img
          src={qrCode}
          alt="QR Code"
          style={{
            width: "280px",
            margin: "20px 0",
          }}
        />
      )}

      <p>สถานะปัจจุบัน: {reservation.status}</p>

      <button
        onClick={handleConfirm}
        disabled={!canConfirm || loading}
        style={{
          opacity: !canConfirm ? 0.5 : 1,
          padding: "12px 24px",
          fontSize: "16px",
          cursor: !canConfirm
            ? "not-allowed"
            : "pointer",
        }}
      >
        {loading
          ? "กำลังส่งคำขอ..."
          : "ยืนยันการชำระเงิน"}
      </button>
    </div>
  );
}
