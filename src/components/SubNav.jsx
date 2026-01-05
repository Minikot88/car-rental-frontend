import React from "react";
import { Link } from "react-router-dom";

export default function SubNav() {
  return (
    <div style={styles.subnav}>
      <div style={styles.container}>
        <Link to="/" style={styles.item}>หน้าแรก</Link>
        <Link to="/cars" style={styles.item}>รถทั้งหมด</Link>
        <Link to="/search" style={styles.item}>จองรถ</Link>
        <Link to="/profile" style={styles.item}>โปรไฟล์</Link>
      </div>
    </div>
  );
}

const styles = {
  subnav: {
    position: "fixed",
    top: 64,
    left: 0,
    right: 0,
    height: 56,
    background: "transparent",
    borderBottom: "none",
    zIndex: 900,
    display: "flex",
    alignItems: "center",
    boxShadow: "var(--shadow-elevation)",
    backdropFilter: "blur(8px)",
    transform: "translateZ(0)",
  },
  container: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    overflowX: "auto",
    padding: "0 18px",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    justifyContent: "center",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 10,
    color: "var(--text)",
    textDecoration: "none",
    background: "transparent",
    whiteSpace: "nowrap",
    fontWeight: 600,
  },
};
