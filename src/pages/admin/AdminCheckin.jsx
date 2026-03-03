import { useState, useEffect } from "react";
import api from "@/utils/axios";
import {
  SwalSuccess,
  SwalError,
  SwalConfirm,
} from "@/utils/swal";

export default function AdminCheckin() {
   const [reservations, setReservations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    mileageBefore: "",
    mileageAfter: "",
    fuelLevel: "",
    fuelFull: true,
    damageCost: 0,
  });

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reservations", {
        skipLoading: true,
      });
      setReservations(res.data || []);
    } catch (err) {
      console.error(err);
      SwalError({ title: "โหลดข้อมูลไม่สำเร็จ" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  //////////////////////////////////////////////////////
  // CHECKIN
  //////////////////////////////////////////////////////
  const handleCheckin = async () => {
    if (!form.mileageBefore || !form.fuelLevel) {
      SwalError({ title: "กรอกข้อมูลให้ครบ" });
      return;
    }

    const confirm = await SwalConfirm({
      title: "ยืนยัน Check-in ?",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.post(
        `/checkin/checkin/${selected.id}`,
        {
          mileageBefore: Number(form.mileageBefore),
          fuelLevel: form.fuelLevel,
        }
      );

      SwalSuccess({ title: "Check-in สำเร็จ" });
      setSelected(null);
      fetchReservations();
    } catch (err) {
      console.error(err);
      SwalError({ title: "Check-in ไม่สำเร็จ" });
    }
  };

  //////////////////////////////////////////////////////
  // CHECKOUT
  //////////////////////////////////////////////////////
  const handleCheckout = async () => {
    if (!form.mileageAfter) {
      SwalError({ title: "กรอกเลขไมล์หลังคืนรถ" });
      return;
    }

    const confirm = await SwalConfirm({
      title: "ยืนยัน Check-out ?",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await api.post(
        `/checkin/checkout/${selected.id}`,
        {
          mileageAfter: Number(form.mileageAfter),
          fuelFull: form.fuelFull,
          damageCost: Number(form.damageCost),
        }
      );

      SwalSuccess({
        title: `ค่าปรับ ฿${res.data.fine}`,
        text: `ยอดรวมใหม่ ฿${res.data.finalTotal}`,
      });

      setSelected(null);
      fetchReservations();
    } catch (err) {
      console.error(err);
      SwalError({ title: "Check-out ไม่สำเร็จ" });
    }
  };

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
             <td>{r.user?.name} {r.user?.surname}</td>
<td>{r.car?.name}</td>
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
