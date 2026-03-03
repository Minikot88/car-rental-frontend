import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/axios";

export default function AdminToday() {
  const navigate = useNavigate();

  //////////////////////////////////////////////////////
  // STATE (ต้องอยู่บนสุด)
  //////////////////////////////////////////////////////
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    deliveries: [],
    returns: [],
    todayRevenue: 0,
  });

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/operations/today");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading) return <div>Loading...</div>;

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div>
      <h1>📊 Today Operations</h1>

      <h2>
        💰 รายได้วันนี้:{" "}
        {Number(data.todayRevenue ?? 0).toLocaleString()} บาท
      </h2>

      <h2>🚐 วันนี้ต้องส่งรถ</h2>
      {data.deliveries.length === 0 && <p>ไม่มีรายการ</p>}

      {data.deliveries.map((item) => (
        <div key={item.id}>
          <b>{item.car.name}</b> - {item.user.name}
          <br />
          {item.pickupTime &&
            new Date(item.pickupTime).toLocaleString()}
          <br />
          <button
            onClick={() =>
              navigate(`/admin/checkin/${item.id}`)
            }
          >
            เช็คอิน
          </button>
        </div>
      ))}

      <h2>🔁 วันนี้ต้องรับคืน</h2>
      {data.returns.length === 0 && <p>ไม่มีรายการ</p>}

      {data.returns.map((item) => (
        <div key={item.id}>
          <b>{item.car.name}</b> - {item.user.name}
          <br />
          {item.dropoffTime &&
            new Date(item.dropoffTime).toLocaleString()}
          <br />
          <button
            onClick={() =>
              navigate(`/admin/checkout/${item.id}`)
            }
          >
            รับคืนรถ
          </button>
        </div>
      ))}
    </div>
  );
}