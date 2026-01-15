import { useState } from "react";

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

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status:
                u.status === "active"
                  ? "blocked"
                  : "active",
            }
          : u
      )
    );
  };

  const changeRole = (id, role) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role } : u
      )
    );
  };

  const deleteUser = (id) => {
    if (!window.confirm("ลบผู้ใช้นี้หรือไม่?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <h1>จัดการผู้ใช้</h1>

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
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    changeRole(u.id, e.target.value)
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>

              <td>
                <span
                  className={
                    u.status === "active"
                      ? "badge success"
                      : "badge danger"
                  }
                >
                  {u.status}
                </span>
              </td>

              <td>
                <button
                  onClick={() => toggleStatus(u.id)}
                >
                  {u.status === "active"
                    ? "ปิดใช้งาน"
                    : "เปิดใช้งาน"}
                </button>

                <button
                  className="danger"
                  onClick={() => deleteUser(u.id)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
