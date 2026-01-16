import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/admin-users.css";

/* ===== MOCK USERS ===== */
const mockUsers = [
  {
    id: 1,
    name: "Admin One",
    email: "admin@carrental.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Somchai",
    email: "somchai@gmail.com",
    role: "user",
    status: "active",
  },
  {
    id: 3,
    name: "Somsri",
    email: "somsri@gmail.com",
    role: "user",
    status: "blocked",
  },
];

export default function AdminUsers() {

  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  /* ===== SEARCH ===== */
  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.role} ${u.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ===== ACTIONS ===== */
  const toggleStatus = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? {
            ...u,
            status: u.status === "active" ? "blocked" : "active",
          }
          : u
      )
    );
    setSelectedUser(null);
  };

  const deleteUser = () => {
    if (!window.confirm("ลบผู้ใช้นี้หรือไม่?")) return;
    setUsers((prev) =>
      prev.filter((u) => u.id !== selectedUser.id)
    );
    setSelectedUser(null);
  };

  return (
    <>
      <h1>จัดการผู้ใช้</h1>

      {/* ===== TOOLBAR ===== */}
      <div className="users-toolbar">
        <input
          type="text"
          placeholder="🔍 ค้นหา ชื่อ / email / role / สถานะ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count">
          ทั้งหมด {filteredUsers.length} คน
        </span>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>Email</th>
              <th>Role</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role ${u.role}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${u.status === "active"
                          ? "success"
                          : "danger"
                        }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="manage-btn"
                      onClick={() => setSelectedUser(u)}
                    >
                      จัดการ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== DIGITAL MODAL (MUI STYLE) ===== */}
      {selectedUser && (
        <div
          className="dialog-backdrop"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>จัดการผู้ใช้</h3>
            <p className="dialog-user">
              {selectedUser.name} ({selectedUser.email})
            </p>

            <div className="dialog-actions">
              <button
                onClick={() => {
                  navigate(`/admin/users/${selectedUser.id}`);
                  setSelectedUser(null);
                }}
              >
                📄 รายละเอียดผู้ใช้
              </button>

              <button onClick={toggleStatus}>
                ⚙️{" "}
                {selectedUser.status === "active"
                  ? "ปิดใช้งาน"
                  : "เปิดใช้งาน"}
              </button>

              <button
  onClick={() => {
    navigate(`/admin/users/${selectedUser.id}/edit`);
    setSelectedUser(null);
  }}
>
  ✏️ แก้ไขข้อมูล
</button>


   <button
  onClick={() => {
    navigate(`/admin/users/${selectedUser.id}/bookings`);
    setSelectedUser(null);
  }}
>
  📚 ประวัติการจอง
</button>


              <button
                className="danger"
                onClick={deleteUser}
              >
                🗑 ลบผู้ใช้
              </button>
            </div>

            <button
              className="dialog-close"
              onClick={() => setSelectedUser(null)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </>
  );
}
