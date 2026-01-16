import "../styles/admin-datatable.css";

export default function DataTable({
  columns = [],
  data = [],
  renderActions,
}) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {renderActions && <th className="th-actions">จัดการ</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="empty"
              >
                ไม่มีข้อมูล
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id || index} className="row-hover">
                {columns.map((col) => (
                  <td key={col.key}>
                    {typeof col.render === "function"
                      ? col.render(row)
                      : row[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="actions">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
