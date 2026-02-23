import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";
import RevenueChart from "../../components/admin/RevenueChart";
import "../styles/admin-dashboard.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);
      } catch (err) {
        console.error("DASHBOARD ERROR:", err);
        setError("ไม่สามารถโหลดข้อมูล Dashboard ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div style={{ padding: "40px 0" }}>
        <p>⏳ กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div style={{ padding: "40px 0", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <p style={{ padding: "40px 0" }}>ไม่มีข้อมูล</p>;
  }

  /* ================= DESTRUCTURE DATA ================= */
  const {
    kpiSummary = [],
    bookingStats = {},
    paymentStats = {},
    revenueChart7Days = [],
    revenueMonthly = [],
  } = data;

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <h1>📊 Dashboard วิเคราะห์ระบบ</h1>
        <p className="dashboard-subtitle">
          ภาพรวมสถิติการจอง รายได้ และสถานะระบบ
        </p>
      </div>

      {/* ================= KPI SUMMARY ================= */}
      <section className="section">
        <h2>ภาพรวมระบบ</h2>

        <div className="analytics-grid">
          {kpiSummary.map((kpi, index) => (
            <StatCard
              key={index}
              title={kpi.title}
              value={
                typeof kpi.value === "number"
                  ? kpi.title.includes("รายได้") ||
                    kpi.title.includes("รายรับ")
                    ? `฿${kpi.value.toLocaleString()}`
                    : kpi.value.toLocaleString()
                  : kpi.value
              }
            />
          ))}
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="section">
        <h2>สถิติการจอง</h2>

        <div className="analytics-grid">
          <StatCard title="วันนี้" value={bookingStats.today ?? 0} />
          <StatCard
            title="7 วันล่าสุด"
            value={bookingStats.thisWeek ?? 0}
          />
          <StatCard
            title="เดือนนี้"
            value={bookingStats.thisMonth ?? 0}
          />
          <StatCard
            title="ยกเลิก"
            value={bookingStats.canceled ?? 0}
          />
        </div>
      </section>

      {/* ================= PAYMENT ================= */}
      <section className="section">
        <h2>การเงิน</h2>

        <div className="analytics-grid">
          <StatCard
            title="ชำระแล้ว"
            value={`฿${Number(
              paymentStats.paidAmount ?? 0
            ).toLocaleString()}`}
          />
          <StatCard
            title="ค้างชำระ"
            value={`฿${Number(
              paymentStats.pendingAmount ?? 0
            ).toLocaleString()}`}
          />
        </div>
      </section>

      {/* ================= REVENUE 7 DAYS ================= */}
      <section className="section">
        <h2>รายได้ 7 วันล่าสุด</h2>

        <div className="chart-wrapper">
          {revenueChart7Days.length > 0 ? (
            <RevenueChart data={revenueChart7Days} />
          ) : (
            <p>ไม่มีข้อมูลรายได้</p>
          )}
        </div>
      </section>

      {/* ================= MONTHLY REVENUE ================= */}
      <section className="section">
        <h2>รายได้รายเดือน</h2>

        <div className="data-table-wrapper">
          <DataTable
            columns={[
              { key: "month", label: "เดือน" },
              {
                key: "revenue",
                label: "รายได้",
                render: (row) =>
                  `฿${Number(row.revenue).toLocaleString()}`,
              },
            ]}
            data={revenueMonthly}
          />
        </div>
      </section>
    </>
  );
}