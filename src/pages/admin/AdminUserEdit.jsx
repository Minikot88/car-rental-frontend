import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/admin-users.css";

/* MOCK USER */
const mockUser = {
    name: "Somchai",
    email: "somchai@gmail.com",
    role: "user",
    status: "active",
};

export default function AdminUserEdit() {
    const { id: _id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState(mockUser);

    function handleSave() {
        alert("บันทึกข้อมูลผู้ใช้แล้ว (mock)");
        navigate(-1);
    }

    return (
        <>
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← ย้อนกลับ
            </button>

            <h1>แก้ไขข้อมูลผู้ใช้</h1>

            <div className="user-detail-card">
                <div className="form">
                    <label>
                        ชื่อ
                        <input
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </label>

                    <label>
                        Email
                        <input
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </label>

                    <label>
                        Role
                        <select
                            value={form.role}
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                        >
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </label>

                    <label>
                        สถานะ
                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({ ...form, status: e.target.value })
                            }
                        >
                            <option value="active">active</option>
                            <option value="blocked">blocked</option>
                        </select>
                    </label>

                    <button className="btn-primary" onClick={handleSave}>
                        💾 บันทึก
                    </button>
                </div>
            </div>
        </>
    );
}
