import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import api from "@/utils/axios";
import { SwalError } from "@/utils/swal";
import { useAuth } from "@/context/AuthContext";
import "./styles/Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  const today = new Date().toISOString().slice(0, 10);

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [hasFlightTicket, setHasFlightTicket] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    start: state?.start || "",
    end: state?.end || "",
  });

  //////////////////////////////////////////////////////
  // AUTO FILL USER
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: `${user.name || ""} ${user.surname || ""}`,
        phone: user.phone || "",
      }));
    }
  }, [user]);

  //////////////////////////////////////////////////////
  // LOAD CAR
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await api.get(`/cars/${id}`, {
          skipLoading: true,
        });
        setCar(data);
      } catch {
        SwalError({ title: "ไม่พบข้อมูลรถ" });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  //////////////////////////////////////////////////////
  // CALCULATE DAYS
  //////////////////////////////////////////////////////
  const rentalDays = useMemo(() => {
    if (!form.start || !form.end) return 0;

    const diff =
      (new Date(form.end) - new Date(form.start)) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  }, [form.start, form.end]);

  //////////////////////////////////////////////////////
  // PRICE
  //////////////////////////////////////////////////////
  const pricePerDay = car?.pricePerDay ?? 0;
  const vatRate = (car?.vatPercent ?? 7) / 100;
  const deposit = car?.deposit ?? 0;

  const subtotal = rentalDays * pricePerDay;
  const vat = subtotal * vatRate;

  const depositAmount =
    hasFlightTicket && car?.isDepositWaivable
      ? 0
      : deposit;

  const grandTotal = subtotal + vat + depositAmount;

  useEffect(() => {
    if (!grandTotal) return;
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 300);
    return () => clearTimeout(timer);
  }, [grandTotal]);

  //////////////////////////////////////////////////////
  // VALIDATION
  //////////////////////////////////////////////////////
  const phoneValid = /^[0-9]{9,10}$/.test(form.phone);

  const isValid =
    form.name.trim() &&
    phoneValid &&
    form.start &&
    form.end &&
    rentalDays > 0 &&
    form.start >= today;

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////
  const handleSubmit = async () => {
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);

      const { data } = await api.post(
        "/reservations",
        {
          carId: Number(id),
          startDate: form.start,
          endDate: form.end,
          hasFlightTicket,
        },
        { skipLoading: true }
      );

      navigate(`/payment/${data.id}`);
    } catch (err) {
      SwalError({
        title:
          err.response?.data?.message ||
          "เกิดข้อผิดพลาดในการจอง",
      });
    } finally {
      setSubmitting(false);
    }
  };

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading) {
    return (
      <div className="booking-page">
        ⏳ กำลังโหลดข้อมูล...
      </div>
    );
  }

  if (!car) return null;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="booking-page">
      <div className="booking-layout">

        <div className="booking-left">

          <div className="card">
            <h2>ข้อมูลผู้จอง</h2>

            <input
              placeholder="ชื่อ - นามสกุล"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="เบอร์โทร"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            {!phoneValid && form.phone && (
              <small className="error">
                เบอร์โทรไม่ถูกต้อง
              </small>
            )}
          </div>

          <div className="card">
            <h3>วันที่เช่า</h3>

            <input
              type="date"
              min={today}
              value={form.start}
              onChange={(e) =>
                setForm({ ...form, start: e.target.value })
              }
            />

            <input
              type="date"
              min={form.start || today}
              value={form.end}
              onChange={(e) =>
                setForm({ ...form, end: e.target.value })
              }
            />
          </div>

          {deposit > 0 && (
            <div className="card">
              <h3>มัดจำ</h3>

              {car.isDepositWaivable && (
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={hasFlightTicket}
                    onChange={(e) =>
                      setHasFlightTicket(
                        e.target.checked
                      )
                    }
                  />
                  มีตั๋วเครื่องบิน (ฟรีมัดจำ)
                </label>
              )}

              <p>
                มัดจำ:
                {depositAmount === 0
                  ? " ฟรี"
                  : ` ฿${depositAmount.toLocaleString()}`}
              </p>
            </div>
          )}
        </div>

        <aside className="booking-right">
          <div className="card">

            <div>จำนวนวัน: {rentalDays}</div>
            <div>Subtotal: ฿{subtotal.toLocaleString()}</div>
            <div>
              VAT ({(vatRate * 100).toFixed(0)}%):
              ฿{vat.toLocaleString()}
            </div>

            <div className={`price-live ${animatePrice ? "price-animate" : ""}`}>
              รวมสุทธิ ฿{grandTotal.toLocaleString()}
            </div>
          </div>
        </aside>
      </div>

      <div className="booking-footer">
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="booking-submit"
        >
          {submitting ? "กำลังดำเนินการ..." : "ดำเนินการต่อ"}
        </button>
      </div>
    </div>
  );
}