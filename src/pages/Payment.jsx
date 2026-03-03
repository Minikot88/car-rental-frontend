import {
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import "./styles/Payment.css";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH RESERVATION
  //////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchReservation() {
      try {
        const res = await api.get(`/reservations/${id}`, {
          skipLoading: true,
        });

        setReservation(res.data);
      } catch (err) {
        navigate("/carslist");
      } finally {
        setPageLoading(false);
      }
    }

    if (id) fetchReservation();
  }, [id, navigate]);

  //////////////////////////////////////////////////////
  // CREATE QR
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation) return;
    if (qrCode) return;

    if (!["PENDING", "WAITING_PAYMENT"].includes(reservation.status))
      return;

    async function createQR() {
      try {
        const res = await api.post(
          `/payments/create-qr`,
          { reservationId: reservation.id },
          { skipLoading: true }
        );

        setQrCode(res.data.qrImage);
      } catch {
        navigate("/carslist");
      }
    }

    createQR();
  }, [reservation?.id, reservation?.status]);

  //////////////////////////////////////////////////////
  // POLLING STATUS
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation) return;
    if (reservation.status === "CONFIRMED") return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(
          `/payments/status/${reservation.id}`,
          { skipLoading: true }
        );

        if (res.data.reservationStatus === "CONFIRMED") {
          clearInterval(interval);
          navigate(`/reservations/${reservation.id}`);
        }
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, [reservation?.id, reservation?.status, navigate]);

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
  }, [reservation?.lockExpiresAt, navigate]);

  //////////////////////////////////////////////////////
  if (pageLoading)
    return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!reservation)
    return <Navigate to="/carslist" />;

  //////////////////////////////////////////////////////
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  //////////////////////////////////////////////////////
  return (
    <div className="payment-page">
      <div className="payment-card">

        <h2 className="payment-title">
          PromptPay Payment
        </h2>

        <div className="payment-summary">
          <div className="payment-row">
            <span>Reservation</span>
            <span>#{reservation.id}</span>
          </div>

          <div className="payment-total">
            <span>ยอดที่ต้องชำระ</span>
            <span>
              ฿{reservation.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {reservation.lockExpiresAt && (
          <div className="payment-timer">
            ⏳ ชำระเงินภายใน
            <strong>{formatTime(timeLeft)}</strong>
          </div>
        )}

        <div className="qr-wrapper">
          {qrCode ? (
            <img src={qrCode} alt="QR Code" />
          ) : (
            <div className="qr-loading">
              Generating QR...
            </div>
          )}
        </div>

        <div
          className={`payment-status status-${reservation.status}`}
        >
          {reservation.status}
        </div>

      </div>
    </div>
  );
}