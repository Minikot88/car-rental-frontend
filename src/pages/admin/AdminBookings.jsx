import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admin-table.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminBookings() {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  //////////////////////////////////////////////////////
  // UPDATE STATUS (SAFE)
  //////////////////////////////////////////////////////
  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API}/reservations/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchBookings();
    } catch (err) {
      console.log("STATUS UPDATE ERROR:", err.response?.data);
      alert(err.response?.data?.message || "อัปเดตสถานะไม่สำเร็จ");
    }
  };

  //////////////////////////////////////////////////////
  // STATUS MAP
  //////////////////////////////////////////////////////
  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "รอชำระเงิน";
      case "WAITING_PAYMENT":
        return "รอตรวจสอบ";
      case "CONFIRMED":
        return "ยืนยันแล้ว";
      case "CANCELLED":
        return "ยกเลิก";
      case "COMPLETED":
        return "เสร็จสิ้น";
      case "EXPIRED":
        return "หมดเวลา";
      default:
        return status;
    }
  };

  const statusClass = (status) => {
    switch (status) {
      case "CONFIRMED":
      case "COMPLETED":
        return "success";
      case "PENDING":
      case "WAITING_PAYMENT":
        return "pending";
      case "CANCELLED":
      case "EXPIRED":
        return "cancel";
      default:
        return "";
    }
  };

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////
  const filteredBookings = bookings.filter((b) =>
    `${b.car?.name || ""} ${b.user?.name || ""} ${
      b.user?.surname || ""
    } ${b.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <>
      <h1 className="page-title">การจอง</h1>

      <div className="table-toolbar">
        <input
          type="text"
          placeholder="🔍 ค้นหา รถ / ลูกค้า / สถานะ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="result-count">
          พบ <b>{filteredBookings.length}</b> รายการ
        </span>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>รถ</th>
              <th>ลูกค้า</th>
              <th>ช่วงวันที่</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="empty">
                  กำลังโหลด...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.car?.name || "-"}</td>

                  <td>
                    {b.user?.name || "-"} {b.user?.surname || ""}
                  </td>

                  <td>
                    {new Date(b.startDate).toLocaleDateString("th-TH")} →{" "}
                    {new Date(b.endDate).toLocaleDateString("th-TH")}
                  </td>

                  <td>
                    <span className={`status ${statusClass(b.status)}`}>
                      {translateStatus(b.status)}
                    </span>
                  </td>

                  <td>
                    {(b.status === "PENDING" ||
                      b.status === "WAITING_PAYMENT") && (
                      <>
                        <button
                          className="btn-cancel"
                          onClick={() =>
                            handleStatusUpdate(b.id, "CANCELLED")
                          }
                        >
                          ❌ ยกเลิก
                        </button>

                        <button
                          className="btn-confirm"
                          onClick={() =>
                            handleStatusUpdate(b.id, "CONFIRMED")
                          }
                        >
                          ✅ ยืนยัน
                        </button>
                      </>
                    )}

                    {b.status === "CONFIRMED" && (
                      <button
                        className="btn-complete"
                        onClick={() =>
                          handleStatusUpdate(b.id, "COMPLETED")
                        }
                      >
                        ✔ เสร็จสิ้น
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
