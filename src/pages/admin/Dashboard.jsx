// pages/admin/Dashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    };

    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="card">
          <h3>Users</h3>
          <p>{data.totalUsers}</p>
        </div>

        <div className="card">
          <h3>Cars</h3>
          <p>{data.totalCars}</p>
        </div>

        <div className="card">
          <h3>Reservations</h3>
          <p>{data.totalReservations}</p>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p>฿{data.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}
