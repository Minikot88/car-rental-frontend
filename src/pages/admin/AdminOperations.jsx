import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin-operations.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminOperations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null); // 🔐 per row loading
  const navigate = useNavigate();

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

    // 🔄 AUTO REFRESH ทุก 10 วิ
    const interval = setInterval(() => {
      fetchData(token, false);
    }, 10000);

    return () => clearInterval(interval);

  }, [navigate]);

  async function fetchData(token, showLoading = true) {
    try {
      if (showLoading) setLoading(true);

      const res = await axios.get(`${API}/operations/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data || []);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("คุณไม่มีสิทธิ์เข้าหน้านี้ (Admin only)");
      } else {
        setError("โหลดข้อมูลไม่สำเร็จ");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  }

  //////////////////////////////////////////////////////
  // CHECK-IN
  //////////////////////////////////////////////////////
  const handleCheckin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setActionLoading(id);

      await axios.post(
        `${API}/operations/${id}/checkin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchData(token, false);

    } catch (err) {
      alert(err.response?.data?.message || "Check-in ไม่สำเร็จ");
    } finally {
      setActionLoading(null);
    }
  };

  //////////////////////////////////////////////////////
  // CHECK-OUT
  //////////////////////////////////////////////////////
  const handleCheckout = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setActionLoading(id);

      await axios.post(
        `${API}/operations/${id}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchData(token, false);

    } catch (err) {
      alert(err.response?.data?.message || "Check-out ไม่สำเร็จ");
    } finally {
      setActionLoading(null);
    }
  };

  //////////////////////////////////////////////////////
  // SUMMARY
  //////////////////////////////////////////////////////
  const checkinCount = data.filter(
    (r) => r.status === "CONFIRMED"
  ).length;

  const checkoutCount = data.filter(
    (r) =>
      r.checkinCheckout?.checkInTime &&
      !r.checkinCheckout?.checkOutTime
  ).length;

  //////////////////////////////////////////////////////
  // STATUS BADGE
  //////////////////////////////////////////////////////
  function getStatusBadge(r) {
    if (r.status === "COMPLETED")
      return <span className="badge green">COMPLETED</span>;

    if (
      r.checkinCheckout?.checkInTime &&
      !r.checkinCheckout?.checkOutTime
    )
      return <span className="badge blue">IN USE</span>;

    if (r.status === "CONFIRMED")
      return <span className="badge orange">WAITING</span>;

    return <span className="badge gray">{r.status || "-"}</span>;
  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////
  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="operations-container">
      <h1>🚐 Today Operations</h1>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="card">
          <h3>🛬 Check-in Today</h3>
          <p>{checkinCount}</p>
        </div>

        <div className="card">
          <h3>🛫 Check-out Today</h3>
          <p>{checkoutCount}</p>
        </div>
      </div>

      {/* TABLE */}
      <table className="ops-table">
        <thead>
          <tr>
            <th>ลูกค้า</th>
            <th>รถ</th>
            <th>เวลา</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                ไม่มีรายการวันนี้
              </td>
            </tr>
          ) : (
            data.map((r) => (
              <tr key={r.id}>
                <td>{r.user?.name || "-"}</td>
                <td>{r.car?.name || "-"}</td>
                <td>
                  {r.pickupTime
                    ? new Date(r.pickupTime).toLocaleTimeString("th-TH")
                    : "-"}
                </td>
                <td>{getStatusBadge(r)}</td>
                <td>
                  {r.status === "CONFIRMED" && (
                    <button
                      className="btn checkin"
                      disabled={actionLoading === r.id}
                      onClick={() => handleCheckin(r.id)}
                    >
                      {actionLoading === r.id
                        ? "กำลังเช็คอิน..."
                        : "Check-in"}
                    </button>
                  )}

                  {r.checkinCheckout?.checkInTime &&
                    !r.checkinCheckout?.checkOutTime && (
                      <button
                        className="btn checkout"
                        disabled={actionLoading === r.id}
                        onClick={() => handleCheckout(r.id)}
                      >
                        {actionLoading === r.id
                          ? "กำลังเช็คเอาท์..."
                          : "Check-out"}
                      </button>
                    )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
