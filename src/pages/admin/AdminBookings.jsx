import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/admin-booking.css";

const API = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 6;

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  //////////////////////////////////////////////////////
  // UPDATE STATUS
  //////////////////////////////////////////////////////
  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการดำเนินการ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API}/reservations/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchBookings();

      Swal.fire({
        icon: "success",
        title: "อัปเดตสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("ผิดพลาด", "ไม่สามารถอัปเดตได้", "error");
    }
  };

  //////////////////////////////////////////////////////
  // FORMAT DATE
  //////////////////////////////////////////////////////
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  //////////////////////////////////////////////////////
  // TRANSLATE STATUS (THAI)
  //////////////////////////////////////////////////////
  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "รอชำระเงิน";
      case "WAITING_PAYMENT":
        return "รอตรวจสอบ";
      case "CONFIRMED":
        return "ยืนยันแล้ว";
      case "COMPLETED":
        return "เสร็จสิ้น";
      case "CANCELLED":
        return "ยกเลิก";
      case "EXPIRED":
        return "หมดเวลา";
      default:
        return status;
    }
  };

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////
  const filtered = bookings.filter((b) => {
    const matchSearch = `${b.car?.name || ""} ${b.user?.name || ""} ${
      b.user?.surname || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter
      ? b.status === statusFilter
      : true;

    return matchSearch && matchStatus;
  });

  //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  //////////////////////////////////////////////////////
  // STATUS BADGE CLASS
  //////////////////////////////////////////////////////
const statusClass = (status) => {
  switch (status) {
    case "PENDING":
      return "badge pending";
    case "WAITING_PAYMENT":
      return "badge waiting";
    case "CONFIRMED":
      return "badge success";
    case "COMPLETED":
      return "badge completed";
    case "CANCELLED":
    case "EXPIRED":
      return "badge cancel";
    default:
      return "badge";
  }
};

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="admin-bookings container">
      <h1 className="page-title">การจอง</h1>

      {/* FILTER */}
      <div className="table-toolbar">
        <input
          placeholder="🔍 ค้นหา รถ / ลูกค้า"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* ================= STATUS TABS ================= */}
<div className="status-tabs">
  {[
    { key: "", label: "ทั้งหมด" },
    { key: "PENDING", label: "รอชำระเงิน" },
    { key: "WAITING_PAYMENT", label: "รอตรวจสอบ" },
    { key: "CONFIRMED", label: "ยืนยันแล้ว" },
    { key: "COMPLETED", label: "เสร็จสิ้น" },
    { key: "CANCELLED", label: "ยกเลิก" },
  ].map((tab) => {
    const count =
      tab.key === ""
        ? bookings.length
        : bookings.filter((b) => b.status === tab.key).length;

    return (
      <button
        key={tab.key}
        className={`status-pill ${
          statusFilter === tab.key ? "active" : ""
        }`}
        onClick={() => {
          setStatusFilter(tab.key);
          setPage(1);
        }}
      >
        {tab.label}
        <span className="pill-count">{count}</span>
      </button>
    );
  })}
</div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="table-wrapper desktop-only">
        <table className="admin-table">
          <thead>
            <tr>
              <th>รถ</th>
              <th>ลูกค้า</th>
              <th>วันที่</th>
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
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : (
              paginated.map((b) => (
                <tr key={b.id}>
                  <td>{b.car?.name}</td>
                  <td>
                    {b.user?.name} {b.user?.surname}
                  </td>
                  <td>
                    {formatDate(b.startDate)} - {formatDate(b.endDate)}
                  </td>
                  <td>
                    <span className={statusClass(b.status)}>
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

      {/* ================= MOBILE CARDS ================= */}
      <div className="mobile-only">
        {paginated.map((b) => (
          <div key={b.id} className="booking-card fade-in">
            <div className="card-header">
              <strong>{b.car?.name}</strong>
              <span className={statusClass(b.status)}>
                {translateStatus(b.status)}
              </span>
            </div>

            <div className="card-body">
              <div>
                👤 {b.user?.name} {b.user?.surname}
              </div>
              <div>
                📅 {formatDate(b.startDate)} - {formatDate(b.endDate)}
              </div>
            </div>

            <div className="card-actions">
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
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}