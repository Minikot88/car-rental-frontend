// src/components/Footer.jsx
function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.divider}></div>

      <p style={styles.text}>
        © {new Date().getFullYear()} CarRental • All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;

const styles = {
  footer: {
    marginTop: 40,
    padding: "20px 10px",
    textAlign: "center",
  },

  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#e5e5e5", // เส้นสีเทาอ่อนแบบมินิมอล
    marginBottom: 15,
  },

  text: {
    color: "#777",          // เทาเรียบหรู
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "0.3px",
  },
};
