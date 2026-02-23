import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminToday() {

  const [loading, setLoading] = useState(true);

const fetchData = async () => {
  const res = await api.get("/operations/today");
  setData(res.data);
  setLoading(false);
};

if (loading) return <div>Loading...</div>;


  const [data, setData] = useState({
    deliveries: [],
    returns: [],
    todayRevenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>📊 Today Operations</h1>

     <h2>
  💰 รายได้วันนี้: {Number(data.todayRevenue ?? 0).toLocaleString()} บาท
</h2>


      <h2>🚐 วันนี้ต้องส่งรถ</h2>
      {data.deliveries.map((item) => (
        <div key={item.id}>
          <b>{item.car.name}</b> - {item.user.name}
          <br />
          {new Date(item.pickupTime).toLocaleString()}
          <br />
          <button onClick={() => navigate(`/admin/checkin/${item.id}`)}>
            เช็คอิน
          </button>
        </div>
      ))}

      <h2>🔁 วันนี้ต้องรับคืน</h2>
      {data.returns.map((item) => (
        <div key={item.id}>
          <b>{item.car.name}</b> - {item.user.name}
          <br />
          {new Date(item.dropoffTime).toLocaleString()}
          <br />
          <button onClick={() => navigate(`/admin/checkout/${item.id}`)}>
            รับคืนรถ
          </button>
        </div>
      ))}
    </div>
  );
}
