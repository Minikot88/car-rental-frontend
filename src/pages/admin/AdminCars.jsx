import { useState, useEffect } from "react";
import api from "@/utils/axios";
import { SwalConfirm, SwalSuccess, SwalError } from "@/utils/swal";
import "../styles/admin-cars.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminCars() {
 const [cars, setCars] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    name: "",
    brand: "",
    model: "",
    pricePerDay: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

   //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await api.get("/cars", {
        skipLoading: true,
      });

      setCars(res.data || []);
    } catch (err) {
      console.error(err);
      SwalError({ title: "โหลดรถไม่สำเร็จ" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  //////////////////////////////////////////////////////
  // OPEN MODAL
  //////////////////////////////////////////////////////
  const openAdd = () => {
    setForm(emptyForm);
    setEditing({});
  };

  const openEdit = (car) => {
    setForm({
      name: car.name || "",
      brand: car.brand || "",
      model: car.model || "",
      pricePerDay: car.pricePerDay || "",
      description: car.description || "",
    });
    setEditing(car);
  };

 //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////
  const saveCar = async () => {
    if (!form.name || !form.brand || !form.model || !form.pricePerDay) {
      SwalError({ title: "กรุณากรอกข้อมูลให้ครบ" });
      return;
    }

    try {
      if (editing?.id) {
        await api.put(`/cars/${editing.id}`, form);
      } else {
        await api.post("/cars", form);
      }

      await fetchCars();
      setEditing(null);
      SwalSuccess({ title: "บันทึกสำเร็จ" });

    } catch (err) {
      console.error(err);
      SwalError({ title: "บันทึกไม่สำเร็จ" });
    }
  };

  //////////////////////////////////////////////////////
  // DELETE
  //////////////////////////////////////////////////////
  const deleteCar = async (id) => {
    const confirm = await SwalConfirm({
      title: "ยืนยันการลบ?",
      text: "ลบแล้วจะไม่สามารถกู้คืนได้",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/cars/${id}`);
      await fetchCars();
      SwalSuccess({ title: "ลบสำเร็จ" });
    } catch (err) {
      console.error(err);
      SwalError({ title: "ลบไม่สำเร็จ" });
    }
  };

  /* ================= UI ================= */

  return (
    <div className="admin-cars container">
      <div className="page-header">
        <h1>จัดการรถ</h1>
        <button className="btn btn-primary" onClick={openAdd}>
          ➕ เพิ่มรถ
        </button>
      </div>

      {loading ? (
        <div className="car-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="car-card skeleton"></div>
          ))}
        </div>
      ) : cars.length === 0 ? (
        <div className="empty-state">
          <p>🚗 ยังไม่มีรถในระบบ</p>
          <button className="btn btn-primary" onClick={openAdd}>
            เพิ่มคันแรกเลย
          </button>
        </div>
      ) : (
        <div className="car-grid">
          {cars.map((c) => (
            <div key={c.id} className="car-card">
              <div className="car-header">
                <div>
                  <div className="car-title">{c.name}</div>
                  <div className="car-sub">
                    {c.brand} • {c.model}
                  </div>
                </div>

                <div className="car-price">
                  ฿{Number(c.pricePerDay).toLocaleString()}
                  <span>/วัน</span>
                </div>
              </div>

              <div className="car-actions">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => openEdit(c)}
                >
                  แก้ไข
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCar(c.id)}
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal fade-in" onClick={(e) => e.stopPropagation()}>
            <h2>{editing?.id ? "แก้ไขรถ" : "เพิ่มรถใหม่"}</h2>

            <div className="form-group">
              <label>ชื่อรถ</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>ยี่ห้อ</label>
              <input
                value={form.brand}
                onChange={(e) =>
                  setForm({ ...form, brand: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>รุ่น</label>
              <input
                value={form.model}
                onChange={(e) =>
                  setForm({ ...form, model: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>ราคา / วัน</label>
              <input
                type="number"
                value={form.pricePerDay}
                onChange={(e) =>
                  setForm({ ...form, pricePerDay: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>รายละเอียด</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={saveCar}>
                บันทึก
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setEditing(null)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}