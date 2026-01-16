import { useParams, useNavigate } from "react-router-dom";
import "../styles/admin-users.css";

/* ===== MOCK USERS (เหมือนหน้า list) ===== */
const mockUsers = [
  {
    id: 1,
    name: "Admin One",
    email: "admin@carrental.com",
    role: "admin",
    status: "active",
    phone: "080-000-0001",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Somchai",
    email: "somchai@gmail.com",
    role: "user",
    status: "active",
    phone: "081-234-5678",
    createdAt: "2024-02-10",
  },
  {
    id: 3,
    name: "Somsri",
    email: "somsri@gmail.com",
    role: "user",
    status: "blocked",
    phone: "089-999-8888",
    createdAt: "2024-03-05",
  },
];

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = mockUsers.find((u) => u.id === Number(id));

  if (!user) {
    return <p>ไม่พบผู้ใช้</p>;
  }

  return (
    <>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← ย้อนกลับ
      </button>

      <h1>รายละเอียดผู้ใช้</h1>

      <div className="user-detail-card">
        <div className="row">
          <span>ชื่อ</span>
          <b>{user.name}</b>
        </div>

        <div className="row">
          <span>Email</span>
          <b>{user.email}</b>
        </div>

        <div className="row">
          <span>เบอร์โทร</span>
          <b>{user.phone}</b>
        </div>

        <div className="row">
          <span>Role</span>
          <b>{user.role}</b>
        </div>

        <div className="row">
          <span>สถานะ</span>
          <span
            className={`badge ${
              user.status === "active" ? "success" : "danger"
            }`}
          >
            {user.status}
          </span>
        </div>

        <div className="row">
          <span>สมัครเมื่อ</span>
          <b>{user.createdAt}</b>
        </div>
      </div>
    </>
  );
}
