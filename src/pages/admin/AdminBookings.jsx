import { useState } from "react";
import { bookings } from "../../data/bookings";
import "../styles/admin-table.css";

export default function AdminBookings() {
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter((b) =>
    `${b.car} ${b.customer} ${b.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="page-title">การจอง</h1>

      {/* Toolbar */}
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

      {/* Table */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>รถ</th>
              <th>ลูกค้า</th>
              <th>ช่วงวันที่</th>
              <th>สถานะ</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="row-hover">
                  <td className="cell-strong">{b.car}</td>
                  <td>{b.customer}</td>
                  <td>
                    <div className="date-range">
                      <span>{b.start}</span>
                      <span className="arrow">→</span>
                      <span>{b.end}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status ${b.status === "ยืนยันแล้ว"
                          ? "success"
                          : b.status === "รอดำเนินการ"
                            ? "pending"
                            : "cancel"
                        }`}
                    >
                      {b.status}
                    </span>
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
