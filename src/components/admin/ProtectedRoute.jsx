import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (role && payload.role !== role) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}
