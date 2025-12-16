// src/components/CarCard.jsx
export default function CarCard({ car }) {
  return (
    <div style={styles.card}>
      <img
        src={car.image}
        alt={car.name}
        style={styles.image}
      />

      <h4 style={styles.name}>{car.name}</h4>
      <p style={styles.price}>฿{car.price.toLocaleString()}</p>

      <button style={styles.button}>เลือกเช่า</button>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
    textAlign: "center",
    padding: "12px",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "10px 0 4px",
  },
  price: {
    fontSize: "16px",
    color: "#ff0000",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ff0000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
