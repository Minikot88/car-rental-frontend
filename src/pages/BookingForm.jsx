// src/pages/BookingForm.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitBooking = () => {
    api.post("/booking", { carId: id, ...form }).then(() => {
      navigate("/payment");
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ฟอร์มการจองรถ</h2>

      <input
        name="fullname"
        placeholder="ชื่อผู้จอง"
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="date"
        name="startDate"
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="date"
        name="endDate"
        onChange={handleChange}
        style={styles.input}
      />

      <button onClick={submitBooking} style={styles.button}>
        ไปหน้าชำระเงิน
      </button>
    </div>
  );
}

export default BookingForm;

const styles = {
  input: {
    display: "block",
    marginBottom: 15,
    padding: 10,
    width: 250,
  },
  button: {
    padding: "10px 15px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 5,
  },
};
