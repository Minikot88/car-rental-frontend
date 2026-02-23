import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../styles/admin-layout.css";

export default function AdminLayout() {
  return (
    <div >
      {/* <Sidebar /> */}
      <main >
        <Outlet />
      </main>
    </div>
  );
}
