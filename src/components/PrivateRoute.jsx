import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();

  // รอ AuthProvider โหลด user ก่อน
  if (loading) {
    return <div style={{ padding: 20 }}>กำลังโหลด...</div>;
  }

  // ยังไม่ login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ตรวจ role ถ้ามีระบุ
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}