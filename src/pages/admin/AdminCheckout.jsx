import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mileageAfter: "",
    fuelLevel: "",
    damageReport: "",
    photos: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("mileageAfter", form.mileageAfter);
    formData.append("fuelLevel", form.fuelLevel);
    formData.append("damageReport", form.damageReport);

    for (let i = 0; i < form.photos.length; i++) {
      formData.append("afterPhotos", form.photos[i]);
    }

    const res = await api.post(`/checkout/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(`คืนรถสำเร็จ ค่าปรับล่าช้า: ${res.data.lateFee} บาท`);
    navigate("/admin/today");
  };

  return (
    <div>
      <h2>🚗 รับคืนรถ</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="เลขไมล์หลังคืน"
          required
          onChange={(e) =>
            setForm({ ...form, mileageAfter: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="ระดับน้ำมัน"
          required
          onChange={(e) =>
            setForm({ ...form, fuelLevel: e.target.value })
          }
        />

        <textarea
          placeholder="รายงานความเสียหาย"
          onChange={(e) =>
            setForm({ ...form, damageReport: e.target.value })
          }
        />

        <input
          type="file"
          multiple
          onChange={(e) =>
            setForm({ ...form, photos: e.target.files })
          }
        />

        <button type="submit">บันทึกการคืนรถ</button>
      </form>
    </div>
  );
}
