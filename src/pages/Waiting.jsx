import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/utils/axios";

export default function Waiting() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);

  //////////////////////////////////////////////////////
  // POLLING STATUS
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!id) return;

    let mounted = true;

    async function fetchStatus() {
      try {
        const res = await api.get(`/reservations/${id}`, {
          skipLoading: true,
        });

        if (!mounted) return;

        const data = res.data;
        setReservation(data);
        setLoading(false);

        //////////////////////////////////////////////////////
        // STATUS HANDLING
        //////////////////////////////////////////////////////
        if (data.status === "CONFIRMED") {
          clearInterval(intervalRef.current);
          navigate(`/reservations/${id}`, { replace: true });
        }

        if (["CANCELLED", "EXPIRED"].includes(data.status)) {
          clearInterval(intervalRef.current);
          navigate("/carslist", { replace: true });
        }

      } catch (err) {
        if (!mounted) return;

        if (err.response?.status === 401) {
          navigate("/login");
        } else if (err.response?.status === 404) {
          navigate("/carslist");
        } else {
          console.error("WAITING ERROR:", err);
        }
      }
    }

    //////////////////////////////////////////////////////
    // START
    //////////////////////////////////////////////////////
    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 5000);

    //////////////////////////////////////////////////////
    // CLEANUP
    //////////////////////////////////////////////////////
    return () => {
      mounted = false;
      clearInterval(intervalRef.current);
    };
  }, [id, navigate]);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <h2>กำลังตรวจสอบสถานะ...</h2>
      </div>
    );

  if (!reservation)
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <h2>ไม่พบข้อมูลรายการ</h2>
      </div>
    );

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <h2>⏳ รอการตรวจสอบการชำระเงิน</h2>

      <h3>เลขที่รายการ BL-{reservation.id}</h3>

      <p>
        สถานะปัจจุบัน: <strong>{reservation.status}</strong>
      </p>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: "#f3f4f6",
          borderRadius: 10,
        }}
      >
        ระบบจะรีเฟรชอัตโนมัติทุก 5 วินาที
      </div>
    </div>
  );
}