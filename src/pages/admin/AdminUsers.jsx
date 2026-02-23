import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/admin-users.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  /* ================= LOAD USERS (React 19 Safe) ================= */

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "โหลดข้อมูลไม่สำเร็จ", "error");
      }
    };

    fetchUsers();
  }, [token]);

  /* ================= REFRESH USERS ================= */

  const refreshUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "รีเฟรชข้อมูลไม่สำเร็จ", "error");
    }
  };

  /* ================= UPDATE USER ================= */

  const updateUser = async () => {
    if (!selectedUser) return;

    try {
      await axios.put(
        `${API}/users/${selectedUser.id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refreshUsers();
      setSelectedUser(null);
      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire(
        "ผิดพลาด",
        err.response?.data?.message || "แก้ไขไม่สำเร็จ",
        "error"
      );
    }
  };

  /* ================= DELETE USER ================= */

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "ยืนยันการลบ?",
      text: "ข้อมูลจะไม่สามารถกู้คืนได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e10600",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await refreshUsers();

      Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch {
      Swal.fire("ผิดพลาด", "ลบไม่สำเร็จ", "error");
    }
  };

  /* ================= OPEN USER ================= */

  const openUser = (u) => {
    setSelectedUser(u);
    setForm({
      username: u.username || "",
      name: u.name || "",
      surname: u.surname || "",
      phone: u.phone || "",
      address: u.address || "",
      role: u.role || "USER",
    });
    setEditMode(false);
  };

  /* ================= FILTER ================= */

  const filteredUsers = users.filter((u) =>
    `${u.username} ${u.name} ${u.surname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <div className="admin-users container">
      <h1>จัดการผู้ใช้</h1>

      <input
        className="search-input"
        placeholder="ค้นหา"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* DESKTOP TABLE */}
      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>ชื่อเต็ม</th>
              <th>Role</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.name} {u.surname}</td>

                <td>
                  <span className={`role-badge ${u.role === "ADMIN" ? "admin" : "user"}`}>
                    {u.role}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => openUser(u)}
                  >
                    ดู
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(u.id)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="mobile-user-list">
        {filteredUsers.map((u) => (
          <div key={u.id} className="user-card">
            <div className="user-row">
              <span className="label">Username</span>
              <span>{u.username}</span>
            </div>

            <div className="user-row">
              <span className="label">ชื่อเต็ม</span>
              <span>{u.name} {u.surname}</span>
            </div>

            <div className="user-row">
              <span className="label">Role</span>
              <span className={`role-badge ${u.role === "ADMIN" ? "admin" : "user"}`}>
                {u.role}
              </span>
            </div>

            <div className="user-actions">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => openUser(u)}
              >
                ดู
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(u.id)}
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {editMode ? (
             <>
  <h2>แก้ไขผู้ใช้</h2>

  <div className="form-group">
    <label>ชื่อ</label>
    <input
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
  </div>

  <div className="form-group">
    <label>นามสกุล</label>
    <input
      value={form.surname}
      onChange={(e) => setForm({ ...form, surname: e.target.value })}
    />
  </div>

  <div className="form-group">
    <label>เบอร์โทร</label>
    <input
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
    />
  </div>

  <div className="form-group">
    <label>ที่อยู่</label>
    <input
      value={form.address}
      onChange={(e) => setForm({ ...form, address: e.target.value })}
    />
  </div>

  <div className="form-group">
    <label>Role</label>
    <select
      value={form.role}
      onChange={(e) => setForm({ ...form, role: e.target.value })}
    >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  </div>

  <div className="modal-actions">
    <button className="btn btn-primary" onClick={updateUser}>
      บันทึก
    </button>

    <button
      className="btn btn-outline"
      onClick={() => setEditMode(false)}
    >
      ยกเลิก
    </button>
  </div>
</>
            ) : (
              <>
                <h2>รายละเอียดผู้ใช้</h2>

                <p><strong>ชื่อ:</strong> {selectedUser.name}</p>
                <p><strong>นามสกุล:</strong> {selectedUser.surname}</p>
                <p><strong>เบอร์โทร:</strong> {selectedUser.phone}</p>
                <p><strong>ที่อยู่:</strong> {selectedUser.address}</p>

                <p>
                  <strong>Role:</strong>{" "}
                  <span className={`role-badge ${selectedUser.role === "ADMIN" ? "admin" : "user"}`}>
                    {selectedUser.role}
                  </span>
                </p>

                <div className="modal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditMode(true)}
                  >
                    แก้ไข
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() => setSelectedUser(null)}
                  >
                    ปิด
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}