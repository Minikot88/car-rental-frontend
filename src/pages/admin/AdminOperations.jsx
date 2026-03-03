import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { SwalError, SwalSuccess } from "@/utils/swal";
import "../styles/admin-operations.css";

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
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      const res = await api.get("/operations/today", {
        skipLoading: true,
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
    } catch (err) {
      console.error("OPS ERROR:", err);
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

  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
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
  // ACTIONS
  //////////////////////////////////////////////////////
  const handleCheckin = async (id) => {
    try {
      setActionLoading(id);

      await api.post(`/operations/${id}/checkin`);

      SwalSuccess({ title: "Check-in สำเร็จ" });
      await fetchData();
    } catch {
      SwalError({ title: "Check-in ไม่สำเร็จ" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckout = async (id) => {
    try {
      setActionLoading(id);

      await api.post(`/operations/${id}/checkout`);

      SwalSuccess({ title: "Check-out สำเร็จ" });
      await fetchData();
    } catch {
      SwalError({ title: "Check-out ไม่สำเร็จ" });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p>กำลังโหลด...</p>;

  //////////////////////////////////////////////////////
  // SUMMARY
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

  const carsInUseNow = data.filter(
    (r) =>
      r.checkinCheckout?.checkInTime &&
      !r.checkinCheckout?.checkOutTime
  ).length;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="operations-container container">

      <div className="ops-header">
        <h1>Today Operations</h1>
        <div className="ops-live-kpi">
          🚗 กำลังใช้งานตอนนี้
          <strong>{carsInUseNow}</strong>
        </div>
      </div>

      <div className="ops-summary">
        <div className="ops-card-summary">
          <span>Check-in วันนี้</span>
          <strong>{checkinToday}</strong>
        </div>

        <div className="ops-card-summary">
          <span>Check-out วันนี้</span>
          <strong>{checkoutToday}</strong>
        </div>
      </div>

      <div className="ops-table-wrapper">
        <table className="ops-table">
          <thead>
            <tr>
              <th>ลูกค้า</th>
              <th>รถ</th>
              <th>เวลา</th>
              <th>Countdown</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
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
                    <td>
                      {!isInUse ? (
                        <button
                          className="btn checkin"
                          disabled={actionLoading === r.id}
                          onClick={() => handleCheckin(r.id)}
                        >
                          Check-in
                        </button>
                      ) : (
                        <button
                          className="btn checkout"
                          disabled={actionLoading === r.id}
                          onClick={() => handleCheckout(r.id)}
                        >
                          Check-out
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}