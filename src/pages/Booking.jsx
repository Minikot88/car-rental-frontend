import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "./styles/Booking.css";

const API = import.meta.env.VITE_API_URL;

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = localStorage.getItem("token");

  const today = new Date().toISOString().slice(0, 10);
  const format = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    start: format(state?.start),
    end: format(state?.end),
  });

  //////////////////////////////////////////////////////
  // INIT
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!token) return navigate("/login");

    (async () => {
      try {
        const [carRes, userRes] = await Promise.all([
          axios.get(`${API}/cars/${id}`),
          axios.get(`${API}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCar(carRes.data);
        const u = userRes.data;

        setForm((f) => ({
          ...f,
          name: `${u.name} ${u.surname}`,
          phone: u.phone,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token, navigate]);

  //////////////////////////////////////////////////////
  // CALC
  //////////////////////////////////////////////////////
  const rentalDays = useMemo(() => {
    if (!form.start || !form.end) return 1;
    const diff =
      (new Date(form.end) - new Date(form.start)) /
      (1000 * 60 * 60 * 24);
    return Math.max(1, Math.ceil(diff));
  }, [form]);

  const totalPrice = useMemo(
    () => (car ? rentalDays * car.pricePerDay : 0),
    [rentalDays, car]
  );

  //////////////////////////////////////////////////////
  // SUBMIT → CREATE RESERVATION → GO TO PAYMENT PAGE
  //////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.start || !form.end)
      return alert("กรุณาเลือกวันที่");

    if (form.start < today || form.start >= form.end)
      return alert("วันที่ไม่ถูกต้อง");

    try {
      setSubmitting(true);

      const { data } = await axios.post(
        `${API}/reservations`,
        {
          carId: Number(id),
          startDate: form.start,
          endDate: form.end,
          pickupLocation: "สาขาหลัก",
          dropoffLocation: "สาขาหลัก",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ FIXED: go to /payment/:id
      navigate(`/payment/${data.id}`);

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "❌ รถไม่ว่างหรือเกิดข้อผิดพลาด"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>กำลังโหลด...</p>;
  if (!car) return <p>❌ ไม่พบข้อมูลรถ</p>;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="booking-page">
      <div className="booking-layout">

        <form className="booking-left" onSubmit={handleSubmit}>
          <div className="card">
            <h2>ข้อมูลผู้จอง</h2>
            <input
              name="name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="card">
            <h3>วันที่เช่า</h3>
            <input
              type="date"
              name="start"
              min={today}
              value={form.start}
              onChange={(e) =>
                setForm({ ...form, start: e.target.value })
              }
              required
            />
            <input
              type="date"
              name="end"
              min={form.start || today}
              value={form.end}
              onChange={(e) =>
                setForm({ ...form, end: e.target.value })
              }
              required
            />
          </div>

          <button className="booking-submit" disabled={submitting}>
            {submitting ? "กำลังดำเนินการ..." : "ดำเนินการต่อ"}
          </button>
        </form>

        <aside className="booking-right">
          <div className="card">
            <img src={car.image || "/no-image.png"} alt={car.name} />
            <h3>{car.name}</h3>
            <p>{car.category} • {car.seats} ที่นั่ง</p>
          </div>

          <div className="card">
            <div>รับรถ: {form.start}</div>
            <div>คืนรถ: {form.end}</div>
            <div>จำนวนวัน: {rentalDays}</div>
          </div>

          <div className="card price-card">
            <div>ราคา/วัน: ฿{car.pricePerDay.toLocaleString()}</div>
            <div className="summary-total">
              รวมทั้งหมด: ฿{totalPrice.toLocaleString()}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}