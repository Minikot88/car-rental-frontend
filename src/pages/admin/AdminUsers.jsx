import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await axios.get(`${API}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  }

  async function updateUser() {
    try {
      await axios.put(
        `${API}/users/${selectedUser.id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("แก้ไขสำเร็จ");
      fetchUsers();
      setSelectedUser(null);
      setEditMode(false);

    } catch (err) {
      alert(err.response?.data?.message || "แก้ไขไม่สำเร็จ");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("ลบผู้ใช้นี้?")) return;

    await axios.delete(`${API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  }

  const filteredUsers = users.filter((u) =>
    `${u.username} ${u.name} ${u.surname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <h1>จัดการผู้ใช้</h1>

      <input
        placeholder="ค้นหา"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1" cellPadding="8">
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
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => {
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
                  }}
                >
                  ดู
                </button>

                <button onClick={() => deleteUser(u.id)}>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 20 }}>
          {editMode ? (
            <>
              <input value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })} />

              <input value={form.surname}
                onChange={(e) =>
                  setForm({ ...form, surname: e.target.value })} />

              <input value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })} />

              <input value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })} />

              <select value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <button onClick={updateUser}>บันทึก</button>
            </>
          ) : (
            <>
              <p>ชื่อ: {selectedUser.name}</p>
              <p>นามสกุล: {selectedUser.surname}</p>
              <p>เบอร์โทร: {selectedUser.phone}</p>
              <p>ที่อยู่: {selectedUser.address}</p>
              <p>Role: {selectedUser.role}</p>

              <button onClick={() => setEditMode(true)}>
                แก้ไข
              </button>
            </>
          )}

          <button onClick={() => setSelectedUser(null)}>
            ปิด
          </button>
        </div>
      )}
    </>
  );
}
