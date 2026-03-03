import "../styles/admin-stat-card.css";

export default function StatCard({
  title,
  value,
  icon,
  loading = false,
  growth, // เช่น +12% หรือ -5%
  color = "blue", // blue | green | red | purple
}) {
  return (
    <div className={`stat-card stat-${color}`}>

      {/* HEADER */}
      <div className="stat-header">
        <h4>{title}</h4>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>

      {/* VALUE */}
      {loading ? (
        <div className="stat-loading">กำลังโหลด...</div>
      ) : (
        <div className="stat-value">{value}</div>
      )}

      {/* GROWTH */}
      {growth !== undefined && !loading && (
        <div
          className={`stat-growth ${
            growth >= 0 ? "positive" : "negative"
          }`}
        >
          {growth >= 0 ? "▲" : "▼"} {Math.abs(growth)}%
        </div>
      )}
    </div>
  );
}