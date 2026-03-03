import { useAuth } from "@/context/AuthContext";
import "./styles/Profile.css";

export default function Profile() {
  const { user, loading } = useAuth();

  //////////////////////////////////////////////////////
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card profile-glass text-center">
          <div className="ultra-spinner" />
          <p className="muted">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // ให้ ProtectedRoute จัดการ redirect
  }

  //////////////////////////////////////////////////////
  return (
    <div className="profile-page ultra-fade">

      {/* HEADER */}
      <div className="ultra-header">
        <div className="ultra-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="ultra-username">{user.username}</h2>
          <div className="ultra-badge">
            {user.role === "ADMIN"
              ? "Administrator"
              : "Verified Member"}
          </div>
        </div>
      </div>

      {/* CARD */}
      <div className="profile-card profile-glass ultra-border-glow">
        <div className="profile-grid">

          <Item label="ชื่อ" value={user.name} />
          <Item label="นามสกุล" value={user.surname} />
          <Item label="เบอร์โทร" value={user.phone} />
          <Item label="ที่อยู่" value={user.address} full />

        </div>
      </div>

    </div>
  );
}

function Item({ label, value, full }) {
  return (
    <div className={`ultra-item ${full ? "full" : ""}`}>
      <span className="ultra-label">{label}</span>
      <span className="ultra-value">
        {value || "-"}
      </span>
    </div>
  );
}