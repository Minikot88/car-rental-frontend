import { useEffect, useState, useMemo } from "react";
import api from "@/utils/api";
import { useNavigate } from "react-router-dom";
import {
  SwalConfirm,
  SwalSuccess,
  SwalError,
  SwalDanger,
  SwalToast
} from "@/utils/swal";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/MyBookings.css";

const API = import.meta.env.VITE_API_URL;

//////////////////////////////////////////////////////////
// BUSINESS LOGIC (ห้ามแก้)
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
  if (b.status === "CONFIRMED") return "ชำระเงินแล้ว";

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
  const [filter, setFilter] = useState("ALL");
  const [processingId, setProcessingId] = useState(null);
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////
  // REALTIME CLOCK (Countdown)
  //////////////////////////////////////////////////////////

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //////////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////////

useEffect(() => {
  fetchBookings();
}, []);

async function fetchBookings() {
  try {
    const res = await api.get(`/reservations`);
    setBookings(res.data || []);
  } catch (err) {
    if (err.response?.status === 401) {
      navigate("/login");
    } else {
      console.error(err);
    }
  } finally {
    setLoading(false);
  }
}
  //////////////////////////////////////////////////////////
  // FILTER + MEMO
  //////////////////////////////////////////////////////////
const statusPriority = {
  "รอชำระเงิน": 1,
  "ชำระเงินแล้ว": 2,
  "กำลังใช้งาน": 3,
  "เสร็จสิ้น": 4,
  "ยกเลิกแล้ว": 5,
  "หมดเวลาชำระ": 6
};

  const [collapsedStatus, setCollapsedStatus] = useState({});

const filteredBookings = useMemo(() => {
  const data =
    filter === "ALL"
      ? bookings
      : bookings.filter(
          (b) => getStatusText(b) === filter
        );

  return [...data].sort((a, b) => {
    const statusA = getStatusText(a);
    const statusB = getStatusText(b);

    const pA = statusPriority[statusA] ?? 99;
    const pB = statusPriority[statusB] ?? 99;

    if (pA !== pB) return pA - pB;

    // ถ้า priority เท่ากัน เรียงตามวันที่ใหม่ล่าสุด
    return new Date(b.startDate) - new Date(a.startDate);
  });
}, [bookings, filter]);

  const statusCounts = useMemo(() => {
    const counts = { ALL: bookings.length };
    bookings.forEach((b) => {
      const s = getStatusText(b);
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, [bookings]);


// เรียง + group
const groupedBookings = useMemo(() => {
  const sorted = [...filteredBookings].sort((a, b) => {
    const sA = getStatusText(a);
    const sB = getStatusText(b);

    const pA = statusPriority[sA] ?? 99;
    const pB = statusPriority[sB] ?? 99;

    if (pA !== pB) return pA - pB;

    return new Date(b.startDate) - new Date(a.startDate);
  });

  const groups = {};

  sorted.forEach((b) => {
    const status = getStatusText(b);
    if (!groups[status]) groups[status] = [];
    groups[status].push(b);
  });

  return groups;
}, [filteredBookings]);
  //////////////////////////////////////////////////////////
  // ACTIONS
  //////////////////////////////////////////////////////////

const handleCheckin = async (id) => {
  const result = await SwalConfirm({
    title: "ยืนยัน Check-in ?",
    text: "เมื่อกดยืนยันจะไม่สามารถย้อนกลับได้"
  });

  if (!result.isConfirmed) return;

  try {
    await api.post(`${API}/operations/${id}/checkin`);

    SwalToast({
      icon: "success",
      title: "Check-in สำเร็จ"
    });

    fetchBookings();
  } catch (err) {
    SwalError({
      text: err.response?.data?.message
    });
  }
};


const handleCheckout = async (id) => {
  const result = await SwalDanger({
    title: "ยืนยันคืนรถ ?",
    text: "โปรดตรวจสอบสภาพรถก่อนกดยืนยัน"
  });

  if (!result.isConfirmed) return;

  try {
    await api.post(`${API}/operations/${id}/checkout`);

    SwalToast({
      icon: "success",
      title: "คืนรถเรียบร้อยแล้ว"
    });

  fetchBookings();
  } catch (err) {
    SwalError({
      text: err.response?.data?.message
    });
  }
};

  //////////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////////

  if (loading)
    return <p style={{ textAlign: "center" }}>กำลังโหลด...</p>;

  //////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////

// ✅ แทนที่เฉพาะส่วน return()

return (
  <div className="mybookings-wrapper">
    <h2 className="page-title">ประวัติการจอง</h2>

    {/* FILTER DASHBOARD */}
    <div className="booking-filters">
      {Object.keys(statusCounts).map((key) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.04 }}
          onClick={() => setFilter(key)}
          className={`filter-card ${
            filter === key ? "active" : ""
          }`}
        >
          <div className="filter-label">{key}</div>
          <motion.div
            key={statusCounts[key]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="count"
          >
            {statusCounts[key]}
          </motion.div>
        </motion.div>
      ))}
    </div>

    {Object.entries(groupedBookings).length === 0 && (
      <p className="empty-state">ไม่มีรายการจอง</p>
    )}

    {Object.entries(groupedBookings).map(
      ([status, items]) => {
        const isCollapsed = collapsedStatus[status];

        return (
          <div
            key={status}
            className="status-group"
            data-status={status}
          >

            {/* ===== GROUP HEADER ===== */}
            <div
              className="status-group-header"
              onClick={() =>
                setCollapsedStatus((prev) => ({
                  ...prev,
                  [status]: !prev[status]
                }))
              }
            >
              <h3>
                {status} ({items.length})
              </h3>
              <span>
                {isCollapsed ? "▼ เปิด" : "▲ ซ่อน"}
              </span>
            </div>

            <AnimatePresence>
              {!isCollapsed &&
                items.map((b) => {
                  const isOpen = openId === b.id;
                  const checkin = getCheckinState(b);

                  const remaining =
                    b.lockExpiresAt &&
                    new Date(b.lockExpiresAt).getTime() - now;

                  const expired = isExpired(b);

                  return (
                    <motion.div
                      key={b.id}
                      layout
                      className="booking-card"
                    >
                      {/* HEADER */}
                      <div
                        onClick={() =>
                          setOpenId(isOpen ? null : b.id)
                        }
                        className="booking-header"
                      >
                        <div>
                          <strong>{b.car?.name}</strong>
                          <div className="booking-dates">
                            {new Date(
                              b.startDate
                            ).toLocaleDateString()}{" "}
                            –{" "}
                            {new Date(
                              b.endDate
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="status-badge status-waiting">
                          {getStatusText(b)}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1
                            }}
                            exit={{
                              height: 0,
                              opacity: 0
                            }}
                            className="booking-body"
                          >
                            {/* TIMELINE */}
                            {(() => {
                              const steps = [
                                {
                                  label: "รอชำระเงิน",
                                  value: "รอชำระเงิน"
                                },
                                {
                                  label: "ชำระเงินแล้ว",
                                  value: "ชำระเงินแล้ว"
                                },
                                {
                                  label: "กำลังใช้งาน",
                                  value: "กำลังใช้งาน"
                                },
                                {
                                  label: "เสร็จสิ้น",
                                  value: "เสร็จสิ้น"
                                }
                              ];

                              const current =
                                getStatusText(b);

                              const currentIndex =
                                steps
                                  .map((s) => s.value)
                                  .indexOf(current);

                              return (
                                <div
                                  className={`timeline progress-${currentIndex}`}
                                >
                                  {steps.map(
                                    (step, index) => {
                                      const isActive =
                                        index ===
                                        currentIndex;
                                      const isCompleted =
                                        index <
                                        currentIndex;

                                      return (
                                        <div
                                          key={step.label}
                                          className={`timeline-step
                                            ${
                                              isActive
                                                ? "active"
                                                : ""
                                            }
                                            ${
                                              isCompleted
                                                ? "completed"
                                                : ""
                                            }`}
                                        >
                                          <div className="timeline-dot" />
                                          <div className="timeline-label">
                                            {
                                              step.label
                                            }
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              );
                            })()}

                            {/* COUNTDOWN */}
                            {canContinuePayment(b) &&
                              remaining > 0 && (
                                <div className="countdown">
                                  หมดเวลาใน{" "}
                                  {Math.floor(
                                    remaining /
                                      1000
                                  )}{" "}
                                  วินาที
                                </div>
                              )}

                            {b.status ===
                              "WAITING_PAYMENT" &&
                              expired && (
                                <div className="countdown expired">
                                  หมดเวลาชำระเงิน
                                </div>
                              )}

                            {/* ACTIONS */}
                            <div className="booking-actions">
                              {canContinuePayment(b) && (
                                <button
                                  className="btn-primary"
                                  onClick={() =>
                                    navigate(
                                      `/payment/${b.id}`
                                    )
                                  }
                                >
                                  ชำระเงินต่อ
                                </button>
                              )}

                              {!b
                                .checkinCheckout
                                ?.checkInTime &&
                                b.status ===
                                  "CONFIRMED" &&
                                !canContinuePayment(
                                  b
                                ) && (
                                  <button
                                    className="btn-secondary"
                                    disabled={
                                      !checkin.allowed ||
                                      processingId ===
                                        b.id
                                    }
                                    onClick={() =>
                                      handleCheckin(
                                        b.id
                                      )
                                    }
                                  >
                                    Check-in
                                  </button>
                                )}

                              {b
                                .checkinCheckout
                                ?.checkInTime &&
                                !b
                                  .checkinCheckout
                                  ?.checkOutTime && (
                                  <button
                                    className="btn-success"
                                    onClick={() =>
                                      handleCheckout(
                                        b.id
                                      )
                                    }
                                  >
                                    Check-out
                                  </button>
                                )}

                              {b
                                .checkinCheckout
                                ?.checkOutTime && (
                                  <div className="checkout-badge">
                                    ✔ คืนรถแล้ว
                                  </div>
                                )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        );
      }
    )}
  </div>
);
}