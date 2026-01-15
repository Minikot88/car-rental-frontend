import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import "./styles/Payment.css";

export default function Payment() {
  const { state } = useLocation();
  const [method, setMethod] = useState("cash");

  if (!state) return <Navigate to="/cars" />;

  const { car, form, rentalDays, totalPrice } = state;

  const handleConfirm = () => {
    alert(`เลือกชำระเงินแบบ: ${method}`);
    // ต่อ API / บันทึก DB / redirect success ได้ตรงนี้
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2 className="payment-title">ชำระเงิน</h2>

        {/* ===== BOOKING SUMMARY ===== */}
        <div className="payment-summary">
          <div className="payment-row">
            <span>รถ</span>
            <strong>{car.name}</strong>
          </div>
          <div className="payment-row">
            <span>ผู้จอง</span>
            <strong>{form.name}</strong>
          </div>
          <div className="payment-row">
            <span>จำนวนวัน</span>
            <strong>{rentalDays} วัน</strong>
          </div>

          <div className="payment-total">
            <span>ยอดชำระ</span>
            <strong>฿{totalPrice.toLocaleString()}</strong>
          </div>
        </div>

        {/* ===== PAYMENT METHODS ===== */}
        <div className="payment-methods">
          <h3>เลือกวิธีชำระเงิน</h3>

          <label className={`method-card ${method === "cash" ? "active" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={method === "cash"}
              onChange={() => setMethod("cash")}
            />
            <div>
              <strong>💵 เงินสด</strong>
              <p>ชำระเงินสดในวันรับรถ</p>
            </div>
          </label>

          <label className={`method-card ${method === "qr" ? "active" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="qr"
              checked={method === "qr"}
              onChange={() => setMethod("qr")}
            />
            <div>
              <strong>📱 QR Code (PromptPay)</strong>
              <p>สแกนเพื่อชำระผ่าน Mobile Banking</p>
            </div>
          </label>

          <label className={`method-card ${method === "bank" ? "active" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={method === "bank"}
              onChange={() => setMethod("bank")}
            />
            <div>
              <strong>🏦 โอนผ่านธนาคาร</strong>
              <p>โอนผ่านแอปธนาคาร</p>
            </div>
          </label>
        </div>

        {/* ===== ACTION ===== */}
        <button className="payment-confirm" onClick={handleConfirm}>
          ยืนยันการชำระเงิน
        </button>
      </div>
    </div>
  );
}
