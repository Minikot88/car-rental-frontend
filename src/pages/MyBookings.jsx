import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

//////////////////////////////////////////////////////////
// BUSINESS LOGIC
//////////////////////////////////////////////////////////

function normalizeDate(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
}

function canContinuePayment(b) {
  if (!["PENDING", "WAITING_PAYMENT"].includes(b.status))
    return false;

  if (!b.lockExpiresAt) return false;

  return new Date(b.lockExpiresAt) > new Date();
}

function isExpired(b) {
  if (!b.lockExpiresAt) return false;
  return new Date(b.lockExpiresAt) <= new Date();
}

function getStatusText(b) {
  if (b.status === "COMPLETED") return "เสร็จสิ้น";
  if (b.status === "CANCELLED") return "ยกเลิกแล้ว";
  if (b.status === "EXPIRED") return "หมดเวลาชำระ";
  if (b.status === "WAITING_PAYMENT") return "รอชำระเงิน";

  if (
    b.checkinCheckout?.checkInTime &&
    !b.checkinCheckout?.checkOutTime
  )
    return "กำลังใช้งาน";

  return b.status;
}

function getCheckinState(b) {
  if (b.status !== "CONFIRMED") {
    return { allowed: false, reason: "ยังไม่ยืนยันการจอง" };
  }

  if (b.checkinCheckout?.checkInTime) {
    return { allowed: false, reason: "เช็คอินแล้ว" };
  }

  const today = normalizeDate(new Date());
  const start = normalizeDate(b.startDate);

  if (today.getTime() === start.getTime()) {
    return { allowed: true };
  }

  if (today < start) {
    const diffDays = Math.ceil(
      (start - today) / (1000 * 60 * 60 * 24)
    );

    return {
      allowed: false,
      reason: `เช็คอินได้วันที่ ${start.toLocaleDateString()}`,
      countdown: diffDays,
    };
  }

  return {
    allowed: false,
    reason: "เลยวันเช็คอินแล้ว กรุณาติดต่อแอดมิน",
  };
}

//////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBookings(token);
  }, [navigate]);

  async function fetchBookings(token) {
    try {
      const res = await axios.get(`${API}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleCheckin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/operations/${id}/checkin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings(token);
    } catch (err) {
      alert(err.response?.data?.message || "Check-in ไม่สำเร็จ");
    }
  };

  const handleCheckout = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/operations/${id}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings(token);
    } catch (err) {
      alert(err.response?.data?.message || "Check-out ไม่สำเร็จ");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>กำลังโหลด...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>ประวัติการจอง</h2>

      {bookings.length === 0 && <p>ไม่มีรายการจอง</p>}

      {bookings.map((b) => {
        const isOpen = openId === b.id;
        const checkin = getCheckinState(b);

        return (
          <div
            key={b.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <div
              onClick={() =>
                setOpenId(isOpen ? null : b.id)
              }
              style={{
                padding: 15,
                background: "#f9fafb",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{b.car?.name}</strong>
                <div style={{ fontSize: 13, color: "#666" }}>
                  {new Date(b.startDate).toLocaleDateString()} –{" "}
                  {new Date(b.endDate).toLocaleDateString()}
                </div>
              </div>

              <div>{getStatusText(b)}</div>
            </div>

            {/* DROPDOWN CONTENT */}
            {isOpen && (
              <div style={{ padding: 15 }}>

                {/* CHECK-IN */}
                <button
                  disabled={!checkin.allowed}
                  onClick={() => handleCheckin(b.id)}
                  style={{
                    opacity: checkin.allowed ? 1 : 0.5,
                    marginRight: 8,
                  }}
                >
                  Check-in
                </button>

                {!checkin.allowed && checkin.reason && (
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {checkin.reason}
                    {checkin.countdown && (
                      <div style={{ color: "#d97706" }}>
                        อีก {checkin.countdown} วัน
                      </div>
                    )}
                  </div>
                )}

                {/* CHECK-OUT */}
                {b.checkinCheckout?.checkInTime &&
                  !b.checkinCheckout?.checkOutTime && (
                    <button
                      onClick={() =>
                        handleCheckout(b.id)
                      }
                      style={{ marginLeft: 8 }}
                    >
                      Check-out
                    </button>
                  )}

                {/* CONTINUE PAYMENT */}
                {canContinuePayment(b) && (
                  <button
                    style={{
                      background: "#16a34a",
                      color: "#fff",
                      marginLeft: 8,
                    }}
                    onClick={() =>
                      navigate(`/payment/${b.id}`)
                    }
                  >
                    ชำระเงินต่อ
                  </button>
                )}

                {/* EXPIRED */}
                {["PENDING", "WAITING_PAYMENT"].includes(
                  b.status
                ) &&
                  isExpired(b) && (
                    <div
                      style={{
                        color: "red",
                        fontSize: 12,
                        marginTop: 8,
                      }}
                    >
                      หมดเวลาชำระเงิน ระบบจะยกเลิกอัตโนมัติ
                    </div>
                  )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
