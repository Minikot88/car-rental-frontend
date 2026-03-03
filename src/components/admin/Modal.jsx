import { useEffect } from "react";
import "../styles/admin-modal.css";

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  loading = false,
  closeOnBackdrop = true,
}) {
  //////////////////////////////////////////////////////
  // ESC KEY CLOSE
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="admin-modal-backdrop fade-in"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className="admin-modal slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>

        <div className="admin-modal-content">
          {children}
        </div>

        <div className="admin-modal-actions">
          <button
            className="cancel"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              className="confirm"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "กำลังดำเนินการ..." : confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}