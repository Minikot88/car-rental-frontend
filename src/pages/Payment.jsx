// src/pages/Payment.jsx
function Payment() {
  return (
    <div style={{ padding: 20 }}>
      <h2>การชำระเงิน</h2>
      <p>ระบบรองรับชำระเงินออนไลน์ / โอนผ่านบัญชี</p>

      <button style={styles.button}>ชำระเงิน</button>
    </div>
  );
}

export default Payment;

const styles = {
  button: {
    padding: "10px 15px",
    background: "#007bff",
    color: "#fff",
    borderRadius: 5,
  },
};
