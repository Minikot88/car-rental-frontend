import { useState } from "react";
import "../styles/admin-datatable.css";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  error = null,
  renderActions,
}) {
  const [sortConfig, setSortConfig] = useState(null);

  //////////////////////////////////////////////////////
  // SORT
  //////////////////////////////////////////////////////
  const sortedData = [...data];

  if (sortConfig) {
    sortedData.sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA < valueB)
        return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB)
        return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });
  }

  const handleSort = (key) => {
    let direction = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="data-table-wrapper">
      <table className="data-table">

        {/* HEADER */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() =>
                  col.sortable && handleSort(col.key)
                }
                className={col.sortable ? "sortable" : ""}
              >
                {col.label}

                {sortConfig?.key === col.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                  </span>
                )}
              </th>
            ))}

            {renderActions && (
              <th className="th-actions">จัดการ</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="empty"
              >
                กำลังโหลดข้อมูล...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="empty error"
              >
                เกิดข้อผิดพลาด
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="empty"
              >
                ไม่มีข้อมูล
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr key={row.id} className="row-hover">
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