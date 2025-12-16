// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/profile/bookings").then((res) => setHistory(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>ประวัติการจองของฉัน</h2>

      {history.map((item) => (
        <div key={item.id} style={styles.card}>
          <p>รถ: {item.carName}</p>
          <p>ช่วงวันที่: {item.startDate} - {item.endDate}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
};
