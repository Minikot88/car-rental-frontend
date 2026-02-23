import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin-operations.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminOperations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  //////////////////////////////////////////////////////
  // REALTIME CLOCK
  //////////////////////////////////////////////////////
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //////////////////////////////////////////////////////
  // FETCH DATA
  //////////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData(token);
  }, [navigate]);

  async function fetchData(token) {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/operations/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = (res.data || []).filter((r) => {
        const isWaiting = r.status === "CONFIRMED";
        const isInUse =
          r.checkinCheckout?.checkInTime &&
          !r.checkinCheckout?.checkOutTime;

        return isWaiting || isInUse;
      });

      filtered.sort(
        (a, b) =>
          new Date(a.pickupTime) - new Date(b.pickupTime)
      );

      setData(filtered);
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  //////////////////////////////////////////////////////
  // DATE HELPERS
  //////////////////////////////////////////////////////
  function parseDate(dateString) {
    if (!dateString) return null;
    if (dateString.includes(" ") && !dateString.includes("T")) {
      dateString = dateString.replace(" ", "T");
    }
    return new Date(dateString);
  }

  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(date, tomorrow);
  }

  //////////////////////////////////////////////////////
  // COUNTDOWN
  //////////////////////////////////////////////////////
  function getCountdown(pickupTime) {
    const pickup = parseDate(pickupTime);
    if (!pickup) return "-";

    const diff = pickup - now;
    if (diff <= 0) return "เลยเวลาแล้ว";

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `อีก ${minutes} นาที`;

    const hours = Math.floor(minutes / 60);
    const remain = minutes % 60;
    return `อีก ${hours} ชม. ${remain} นาที`;
  }

  //////////////////////////////////////////////////////
  // STATUS BADGE
  //////////////////////////////////////////////////////
  function getStatusBadge(r) {
    const isInUse =
      r.checkinCheckout?.checkInTime &&
      !r.checkinCheckout?.checkOutTime;

    if (isInUse)
      return <span className="badge inuse">กำลังใช้งาน</span>;

    return <span className="badge waiting">รอรับรถ</span>;
  }

  //////////////////////////////////////////////////////
  // ACTIONS
  //////////////////////////////////////////////////////
  const handleCheckin = async (id) => {
    const token = localStorage.getItem("token");
    setActionLoading(id);

    await axios.post(
      `${API}/operations/${id}/checkin`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await fetchData(token);
    setActionLoading(null);
  };

  const handleCheckout = async (id) => {
    const token = localStorage.getItem("token");
    setActionLoading(id);

    await axios.post(
      `${API}/operations/${id}/checkout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await fetchData(token);
    setActionLoading(null);
  };

  if (loading) return <p>กำลังโหลด...</p>;

  //////////////////////////////////////////////////////
  // SUMMARY CALCULATIONS
  //////////////////////////////////////////////////////
  const today = new Date();

  const checkinToday = data.filter((r) => {
    const pickup = parseDate(r.pickupTime);
    return pickup && isSameDay(pickup, today);
  }).length;

  const checkoutToday = data.filter((r) => {
    const returnDate = parseDate(r.returnTime);
    return returnDate && isSameDay(returnDate, today);
  }).length;

  const checkinTomorrow = data.filter((r) => {
    const pickup = parseDate(r.pickupTime);
    return pickup && isTomorrow(pickup);
  }).length;

  const checkoutTomorrow = data.filter((r) => {
    const returnDate = parseDate(r.returnTime);
    return returnDate && isTomorrow(returnDate);
  }).length;

  const carsInUseNow = data.filter(
    (r) =>
      r.checkinCheckout?.checkInTime &&
      !r.checkinCheckout?.checkOutTime
  ).length;

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////
  return (
    <div className="operations-container container">

      {/* HEADER */}
      <div className="ops-header">
        <h1>Today Operations</h1>

        <div className="ops-live-kpi">
          🚗 กำลังใช้งานตอนนี้
          <strong>{carsInUseNow}</strong>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="ops-summary">
        <div className="ops-card-summary">
          <span>Check-in วันนี้</span>
          <strong>{checkinToday}</strong>
        </div>

        <div className="ops-card-summary">
          <span>Check-out วันนี้</span>
          <strong>{checkoutToday}</strong>
        </div>

        <div className="ops-card-summary">
          <span>Check-in พรุ่งนี้</span>
          <strong>{checkinTomorrow}</strong>
        </div>

        <div className="ops-card-summary">
          <span>Check-out พรุ่งนี้</span>
          <strong>{checkoutTomorrow}</strong>
        </div>
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="ops-table-wrapper">
        <table className="ops-table">
          <thead>
            <tr>
              <th>ลูกค้า</th>
              <th>รถ</th>
              <th>เวลา</th>
              <th>Countdown</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  ไม่มีรายการวันนี้
                </td>
              </tr>
            ) : (
              data.map((r) => {
                const pickup = parseDate(r.pickupTime);
                const isInUse =
                  r.checkinCheckout?.checkInTime &&
                  !r.checkinCheckout?.checkOutTime;

                return (
                  <tr key={r.id}>
                    <td>{r.user?.name}</td>
                    <td>{r.car?.name}</td>
                    <td>
                      {pickup
                        ? pickup.toLocaleTimeString("th-TH")
                        : "-"}
                    </td>
                    <td className="countdown">
                      {getCountdown(r.pickupTime)}
                    </td>
                    <td>{getStatusBadge(r)}</td>
                    <td>
                      <div className="table-actions">
                        {!isInUse && (
                          <button
                            className="btn checkin"
                            disabled={actionLoading === r.id}
                            onClick={() => handleCheckin(r.id)}
                          >
                            Check-in
                          </button>
                        )}

                        {isInUse && (
                          <button
                            className="btn checkout"
                            disabled={actionLoading === r.id}
                            onClick={() => handleCheckout(r.id)}
                          >
                            Check-out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="ops-mobile">
        {data.map((r) => {
          const pickup = parseDate(r.pickupTime);
          const isInUse =
            r.checkinCheckout?.checkInTime &&
            !r.checkinCheckout?.checkOutTime;

          return (
            <div className="ops-card" key={r.id}>
              <div className="ops-card-header">
                <h3>{r.user?.name}</h3>
                {getStatusBadge(r)}
              </div>

              <div className="ops-card-body">
                <p><strong>รถ:</strong> {r.car?.name}</p>
                <p>
                  <strong>เวลา:</strong>{" "}
                  {pickup
                    ? pickup.toLocaleTimeString("th-TH")
                    : "-"}
                </p>
                <p className="countdown">
                  {getCountdown(r.pickupTime)}
                </p>
              </div>

              <div className="ops-card-actions">
                {!isInUse && (
                  <button
                    className="btn checkin"
                    disabled={actionLoading === r.id}
                    onClick={() => handleCheckin(r.id)}
                  >
                    Check-in
                  </button>
                )}

                {isInUse && (
                  <button
                    className="btn checkout"
                    disabled={actionLoading === r.id}
                    onClick={() => handleCheckout(r.id)}
                  >
                    Check-out
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}