import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/utils/axios";
import {
  SwalSuccess,
  SwalError,
  SwalConfirm,
} from "@/utils/swal";

export default function AdminCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mileageAfter: "",
    damageCost: 0,
    fuelFull: true,
    photos: [],
  });

  const [loading, setLoading] = useState(false);

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.mileageAfter) {
      SwalError({ title: "กรอกเลขไมล์หลังคืนรถ" });
      return;
    }

    const confirm = await SwalConfirm({
      title: "ยืนยันการคืนรถ?",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("mileageAfter", form.mileageAfter);
      formData.append("damageCost", form.damageCost);
      formData.append("fuelFull", form.fuelFull);

      for (let i = 0; i < form.photos.length; i++) {
        formData.append("afterPhotos", form.photos[i]);
      }

      const res = await api.post(
        `/checkin/${id}/checkout`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      SwalSuccess({
        title: `ค่าปรับ ฿${res.data.fine}`,
        text: `ยอดรวมใหม่ ฿${res.data.finalTotal}`,
      });

      navigate("/admin/today");

    } catch (err) {
      console.error(err);
      SwalError({ title: "คืนรถไม่สำเร็จ" });
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="admin-checkout">
      <h2>🚗 รับคืนรถ</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>เลขไมล์หลังคืนรถ</label>
          <input
            type="number"
            required
            value={form.mileageAfter}
            onChange={(e) =>
              setForm({
                ...form,
                mileageAfter: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>ค่าความเสียหาย (บาท)</label>
          <input
            type="number"
            value={form.damageCost}
            onChange={(e) =>
              setForm({
                ...form,
                damageCost: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={form.fuelFull}
              onChange={(e) =>
                setForm({
                  ...form,
                  fuelFull: e.target.checked,
                })
              }
            />
            น้ำมันเต็มถัง
          </label>
        </div>

        <div className="form-group">
          <label>รูปหลังคืนรถ</label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setForm({
                ...form,
                photos: e.target.files,
              })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "กำลังบันทึก..." : "บันทึกการคืนรถ"}
        </button>

      </form>
    </div>
  );
}