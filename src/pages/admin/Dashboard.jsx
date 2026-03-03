// pages/admin/Dashboard.jsx

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { SwalError } from "@/utils/swal";
import "../styles/admin-dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard", {
          skipLoading: true,
        });

        setData(res.data);
      } catch (err) {
        console.error("DASHBOARD ERROR:", err);
        SwalError({
          title: "ไม่สามารถโหลดข้อมูล Dashboard ได้",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading) {
    return (
      <div className="admin-loading">
        ⏳ กำลังโหลดข้อมูล...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-error">
        ไม่สามารถโหลดข้อมูลได้
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="admin-dashboard container">
      <h2>📊 Dashboard</h2>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>👤 Users</h3>
          <p>{data.totalUsers?.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>🚗 Cars</h3>
          <p>{data.totalCars?.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>📅 Reservations</h3>
          <p>{data.totalReservations?.toLocaleString()}</p>
        </div>

        <div className="stat-card revenue">
          <h3>💰 Revenue</h3>
          <p>
            ฿{Number(data.totalRevenue ?? 0).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}