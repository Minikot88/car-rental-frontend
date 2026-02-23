import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchProfile() {
      try {
        const res = await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    }

    fetchProfile();
  }, [navigate]);

  if (!user) return <p>กำลังโหลด...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>ข้อมูลโปรไฟล์</h2>

      <div style={{ marginTop: 20 }}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>ชื่อ:</strong> {user.name}</p>
        <p><strong>นามสกุล:</strong> {user.surname}</p>
        <p><strong>เบอร์โทร:</strong> {user.phone}</p>
        <p><strong>ที่อยู่:</strong> {user.address}</p>
      </div>
    </div>
  );
}
