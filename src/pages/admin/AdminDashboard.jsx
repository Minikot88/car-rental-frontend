import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";
import {
  kpiSummary,
  bookingStats,
  carStats,
  userStats,
  paymentStats,
} from "../../data/analytics.mock";

import "../styles/admin-dashboard.css";

export default function AdminDashboard() {
  return (
    <>
      <div className="dashboard-header">
        <h1>Dashboard วิเคราะห์ระบบ</h1>
        <p className="dashboard-subtitle">
          ภาพรวมการดำเนินงานของระบบเช่ารถ
        </p>
      </div>

      {/* ================= KPI ================= */}
      <div className="analytics-grid">
        {kpiSummary.map((kpi, index) => (
          <StatCard
            key={index}
            title={kpi.title}
            value={kpi.value}
          />
        ))}
      </div>

      {/* ================= BOOKINGS ================= */}
      <section className="section">
        <h2>สถิติการจอง</h2>
        <div className="analytics-grid">
          <StatCard title="การจองทั้งหมด" value={bookingStats.totalBookings} />
          <StatCard title="วันนี้" value={bookingStats.today} />
          <StatCard title="สัปดาห์นี้" value={bookingStats.thisWeek} />
          <StatCard title="เดือนนี้" value={bookingStats.thisMonth} />
          <StatCard title="ยกเลิก" value={bookingStats.canceled} />
          <StatCard
            title="เช่าเฉลี่ย (วัน)"
            value={bookingStats.averageRentalDays}
          />
        </div>
      </section>

      {/* ================= USERS ================= */}
      <section className="section">
        <h2>ลูกค้า</h2>
        <div className="analytics-grid">
          <StatCard title="ลูกค้าทั้งหมด" value={userStats.totalUsers} />
          <StatCard title="ชาย" value={userStats.gender[0].value} />
          <StatCard title="หญิง" value={userStats.gender[1].value} />
          <StatCard title="ไม่ระบุ" value={userStats.gender[2].value} />
        </div>
      </section>

      {/* ================= PAYMENTS ================= */}
      <section className="section">
        <h2>การเงิน</h2>
        <div className="analytics-grid">
          <StatCard
            title="รายรับรวม"
            value={`฿${paymentStats.totalRevenue.toLocaleString()}`}
          />
          <StatCard
            title="ชำระแล้ว"
            value={`฿${paymentStats.paidAmount.toLocaleString()}`}
          />
          <StatCard
            title="ค้างชำระ"
            value={`฿${paymentStats.pendingAmount.toLocaleString()}`}
          />
        </div>
      </section>

      {/* ================= CARS PERFORMANCE ================= */}
      <section className="section">
        <h2>ประสิทธิภาพรถแต่ละคัน</h2>

        <DataTable
          columns={[
            { key: "car", label: "รถ" },
            { key: "bookings", label: "จำนวนการจอง" },
            {
              key: "revenue",
              label: "รายได้",
              render: (r) => `฿${r.revenue.toLocaleString()}`,
            },
            {
              key: "avgDays",
              label: "วันเช่าเฉลี่ย",
            },
            {
              key: "occupancyRate",
              label: "อัตราการใช้งาน (%)",
            },
          ]}
          data={carStats.performance}
        />
      </section>
    </>
  );
}
