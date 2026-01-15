// src/components/admin/StatCard.jsx
export default function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h2>{value}</h2>
    </div>
  );
}
