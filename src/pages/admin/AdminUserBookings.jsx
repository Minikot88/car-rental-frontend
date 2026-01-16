import { useParams, useNavigate } from "react-router-dom";
import "../styles/admin-users.css";

/* MOCK BOOKINGS */
const mockBookings = [
    {
        id: 1,
        car: "Toyota Yaris",
        start: "2024-06-01",
        end: "2024-06-03",
        status: "ยืนยันแล้ว",
    },
    {
        id: 2,
        car: "Honda City",
        start: "2024-07-10",
        end: "2024-07-12",
        status: "ยกเลิก",
    },
];

export default function AdminUserBookings() {
    const { id: _id } = useParams();

    const navigate = useNavigate();

    return (
        <>
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← ย้อนกลับ
            </button>

            <h1>ประวัติการจองของผู้ใช้</h1>

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>รถ</th>
                            <th>ช่วงวันที่</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockBookings.map((b) => (
                            <tr key={b.id}>
                                <td>{b.car}</td>
                                <td>
                                    {b.start} → {b.end}
                                </td>
                                <td>
                                    <span className="badge success">
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
