import "../styles/admin-modal.css";

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>

        <div className="admin-modal-content">
          {children}
        </div>

        <div className="admin-modal-actions">
          <button className="cancel" onClick={onClose}>
            ยกเลิก
          </button>

          {onConfirm && (
            <button className="confirm" onClick={onConfirm}>
              ยืนยัน
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
