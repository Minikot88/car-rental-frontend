import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "@/utils/axios";
import "./styles/ReservationDetail.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // STATUS TEXT HELPERS
  //////////////////////////////////////////////////////
  const getBookingStatusText = (status) => {
    const map = {
      PENDING: "กำลังดำเนินการ",
      WAITING_PAYMENT: "รอการชำระเงิน",
      CONFIRMED: "ยืนยันการจองแล้ว",
      CANCELLED: "ยกเลิกแล้ว",
      EXPIRED: "หมดเวลา",
      COMPLETED: "เสร็จสิ้น",
    };
    return map[status] || status;
  };

  const getPaymentStatusText = (status) => {
    const map = {
      PENDING: "รอการตรวจสอบ",
      WAITING_PAYMENT: "รอการชำระเงิน",
      PAID: "ชำระเงินแล้ว",
      FAILED: "ชำระเงินไม่สำเร็จ",
      REFUNDED: "คืนเงินแล้ว",
    };
    return map[status] || "-";
  };

  //////////////////////////////////////////////////////
  // FETCH RESERVATION
  //////////////////////////////////////////////////////
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await api.get(`/reservations/${id}`);
        if (mounted) setReservation(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          navigate("/carslist");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) fetchData();

    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  //////////////////////////////////////////////////////
  // COUNTDOWN
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!reservation?.lockExpiresAt) return;

    const expireTime = new Date(reservation.lockExpiresAt).getTime();

    const interval = setInterval(() => {
      const diff = expireTime - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);

        // Auto refresh page when expired
        if (reservation.status === "WAITING_PAYMENT") {
          navigate("/carslist");
        }
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation?.lockExpiresAt, reservation?.status, navigate]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  //////////////////////////////////////////////////////
  // DOWNLOAD PDF
  //////////////////////////////////////////////////////
  const downloadPDF = useCallback(async (type) => {
    const element = document.getElementById("print-area");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      const filename =
        type === "invoice"
          ? `Invoice-BL-${reservation.id}.pdf`
          : `Contract-BL-${reservation.id}.pdf`;

      pdf.save(filename);
    } catch (err) {
      console.error("PDF Error:", err);
    }
  }, [reservation?.id]);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading)
    return <p style={{ textAlign: "center" }}>กำลังโหลด...</p>;

  if (!reservation)
    return <p style={{ textAlign: "center" }}>ไม่พบข้อมูล</p>;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="reservation-page">

      <div id="print-area">

        <h2 className="reservation-title">
          รายละเอียดใบจอง
          <span>BL-{reservation.id}</span>
        </h2>

        <div className="reservation-grid">

          {/* SUMMARY */}
          <div className="detail-card main">

            <div className="detail-row">
              <span>วันที่เช่า</span>
              <strong>
                {new Date(reservation.startDate)
                  .toLocaleDateString("th-TH")}
                {" → "}
                {new Date(reservation.endDate)
                  .toLocaleDateString("th-TH")}
              </strong>
            </div>

            <div className="detail-row">
              <span>ยอดรวม</span>
              <strong className="price">
                ฿{reservation.totalPrice.toLocaleString()}
              </strong>
            </div>

            <div className="detail-row">
              <span>สถานะการจอง</span>
              <span
                className={`status-badge status-${reservation.status}`}
              >
                {getBookingStatusText(reservation.status)}
              </span>
            </div>

            <div className="detail-row">
              <span>สถานะการชำระเงิน</span>
              <strong>
                {getPaymentStatusText(reservation.payment?.status)}
              </strong>
            </div>

          </div>

          {/* PAYMENT BOX */}
          {["PENDING", "WAITING_PAYMENT"].includes(
            reservation.status
          ) && (
            <div className="detail-card payment-box">

              <h3>รอการชำระเงิน</h3>

              <div className="countdown">
                ⏳ เวลาคงเหลือ
                <span>
                  {timeLeft > 0
                    ? formatTime(timeLeft)
                    : "หมดเวลาแล้ว"}
                </span>
              </div>

              <Link
                to={`/payment/${reservation.id}`}
                className="btn-pay"
              >
                ไปหน้าชำระเงิน
              </Link>

            </div>
          )}

        </div>
      </div>

      {/* ACTIONS */}
      <div className="reservation-actions">

        <button
          onClick={() => downloadPDF("invoice")}
          className="btn-outline"
        >
          🧾 ดาวน์โหลดใบแจ้งหนี้
        </button>

        <button
          onClick={() => downloadPDF("contract")}
          className="btn-outline"
        >
          📄 ดาวน์โหลดสัญญาเช่า
        </button>

      </div>

    </div>
  );
}