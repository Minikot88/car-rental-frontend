// src/pages/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import "../styles/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
