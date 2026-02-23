import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AdminCheckin() {
  const [reservations, setReservations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);

  const [form, setForm] = useState({
    mileageBefore: "",
    mileageAfter: "",
    fuelLevel: "",
    fuelFull: true,
    damageCost: 0
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const res = await axios.get(`${API}/reservations`);
    setReservations(res.data);
  }

  async function handleCheckin() {
    await axios.post(
      `${API}/checkin/checkin/${selected.id}`,
      {
        mileageBefore: form.mileageBefore,
        fuelLevel: form.fuelLevel
      }
    );

    alert("Check-in สำเร็จ");
    setSelected(null);
    fetchReservations();
  }

  async function handleCheckout() {
    const res = await axios.post(
      `${API}/checkin/checkout/${selected.id}`,
      {
        mileageAfter: form.mileageAfter,
        fuelFull: form.fuelFull,
        damageCost: form.damageCost
      }
    );

    alert(
      `Checkout สำเร็จ\nค่าปรับ: ฿${res.data.fine}\nยอดรวมใหม่: ฿${res.data.finalTotal}`
    );

    setSelected(null);
    fetchReservations();
  }

  return (
    <>
      <h1>ระบบ Check-in / Check-out</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>ลูกค้า</th>
            <th>รถ</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.userId}</td>
              <td>{r.carId}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => {
                  setSelected(r);
                  setMode("checkin");
                }}>
                  Check-in
                </button>

                <button onClick={() => {
                  setSelected(r);
                  setMode("checkout");
                }}>
                  Check-out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 20 }}>
          <h3>
            {mode === "checkin" ? "Check-in" : "Check-out"} Reservation #{selected.id}
          </h3>

          {mode === "checkin" && (
            <>
              <input
                placeholder="เลขไมล์ก่อนรับรถ"
                onChange={(e) =>
                  setForm({ ...form, mileageBefore: e.target.value })
                }
              />
              <input
                placeholder="ระดับน้ำมัน"
                onChange={(e) =>
                  setForm({ ...form, fuelLevel: e.target.value })
                }
              />
              <button onClick={handleCheckin}>ยืนยัน Check-in</button>
            </>
          )}

          {mode === "checkout" && (
            <>
              <input
                placeholder="เลขไมล์หลังคืนรถ"
                onChange={(e) =>
                  setForm({ ...form, mileageAfter: e.target.value })
                }
              />

              <label>
                น้ำมันเต็มถัง?
                <input
                  type="checkbox"
                  checked={form.fuelFull}
                  onChange={(e) =>
                    setForm({ ...form, fuelFull: e.target.checked })
                  }
                />
              </label>

              <input
                type="number"
                placeholder="ค่าความเสียหาย"
                onChange={(e) =>
                  setForm({ ...form, damageCost: e.target.value })
                }
              />

              <button onClick={handleCheckout}>ยืนยัน Check-out</button>
            </>
          )}

          <button onClick={() => setSelected(null)}>ปิด</button>
        </div>
      )}
    </>
  );
}
