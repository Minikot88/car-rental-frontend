// src/pages/admin/AdminDashboard.jsx
import StatCard from "../../components/admin/StatCard";
import { carData } from "../../data/cars";
import { bookings } from "../../data/bookings";

export default function AdminDashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <div className="stat-grid">
        <StatCard title="รถทั้งหมด" value={carData.length} />
        <StatCard title="การจอง" value={bookings.length} />
        <StatCard title="รายได้รวม" value="฿120,000" />
        <StatCard title="รถที่ถูกจองวันนี้" value="3" />
      </div>
    </>
  );
}
