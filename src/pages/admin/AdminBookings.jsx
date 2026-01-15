// src/pages/admin/AdminBookings.jsx
import { bookings } from "../../data/bookings";

export default function AdminBookings() {
  return (
    <>
      <h1>การจอง</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>รถ</th>
            <th>ลูกค้า</th>
            <th>วันที่</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.car}</td>
              <td>{b.customer}</td>
              <td>{b.start} – {b.end}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
