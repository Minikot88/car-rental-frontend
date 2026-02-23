import {
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [reservation, setReservation] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH RESERVATION
  //////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchReservation() {
      const res = await axios.get(
        `${API}/reservations/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReservation(res.data);
      setPageLoading(false);
    }

    if (id && token) fetchReservation();
  }, [id, token]);

  //////////////////////////////////////////////////////
  // CREATE QR ONCE
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation) return;
    if (qrCode) return;

    async function createQR() {
      const res = await axios.post(
        `${API}/payments/confirm`,
        { reservationId: reservation.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQrCode(res.data.qrImage);
    }

    if (
      ["PENDING", "WAITING_PAYMENT"].includes(
        reservation.status
      )
    ) {
      createQR();
    }
  }, [reservation?.id]);

  //////////////////////////////////////////////////////
  // AUTO REFRESH STATUS
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation) return;

    const interval = setInterval(async () => {
      const res = await axios.get(
        `${API}/payments/status/${reservation.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.reservationStatus === "CONFIRMED") {
        navigate(`/reservations/${reservation.id}`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [reservation?.id]);

  //////////////////////////////////////////////////////
  // COUNTDOWN
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
        navigate("/carslist");
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation?.id]);

  if (pageLoading)
    return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!reservation)
    return <Navigate to="/carslist" />;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2>PromptPay Payment</h2>
      <h3>Reservation #{reservation.id}</h3>
      <h3>฿{reservation.totalPrice}</h3>

      {reservation.lockExpiresAt && (
        <h2 style={{ color: "red" }}>
          Time left: {formatTime(timeLeft)}
        </h2>
      )}

      {qrCode ? (
        <img
          src={qrCode}
          alt="QR Code"
          style={{ width: 280 }}
        />
      ) : (
        <p>Generating QR...</p>
      )}

      <p>Status: {reservation.status}</p>
    </div>
  );
}