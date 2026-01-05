// src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.cardWrap} className="footer-card">
        <div style={styles.container}>
        <div style={styles.col}>
          <div style={styles.brandRow}>
            <span style={styles.brandIcon}>🚗</span>
            <div>
              <div style={styles.brandName}>CarRental</div>
              <div style={styles.brandTag}>เช่ารถง่าย ทุกทริป</div>
            </div>
          </div>

          <p style={styles.desc}>
            บริการเช่ารถออนไลน์ ครอบคลุมทุกจังหวัด พร้อมตัวเลือกประกันและบริการรับ-ส่ง
          </p>
        </div>

        <div style={styles.col}>
          <div style={styles.colTitle}>ลิงก์ด่วน</div>
          <ul style={styles.list}>
            <li><a href="/cars" style={styles.link}>รถทั้งหมด</a></li>
            <li><a href="/booking/1" style={styles.link}>จองรถ</a></li>
            <li><a href="/profile" style={styles.link}>บัญชีของฉัน</a></li>
          </ul>
        </div>

        <div style={styles.col}>
          <div style={styles.colTitle}>ติดต่อ</div>
          <div style={styles.contact}>support@carrental.example</div>
          <div style={styles.contact}>โทร: 02-123-4567</div>
          <div style={styles.socialRow}>
            <a href="#" style={styles.icon}>🌐</a>
            <a href="#" style={styles.icon}>📘</a>
            <a href="#" style={styles.icon}>📸</a>
          </div>
        </div>
        </div>

        <div style={styles.divider}></div>

        <p style={styles.copy}>© {new Date().getFullYear()} CarRental • All Rights Reserved</p>
      </div>
      <style>{`
        .footer-card { 
          margin: 40px 12px 24px; 
          border-radius: 16px; 
          -webkit-backdrop-filter: blur(6px); 
          backdrop-filter: blur(6px);
          background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.35));
          box-shadow: 0 18px 40px rgba(2,6,23,0.12), 0 6px 18px rgba(2,6,23,0.08) inset;
        }

        .footer-card.theme-dark {
          background: linear-gradient(180deg, rgba(18,20,24,0.6), rgba(22,25,28,0.5));
          box-shadow: 0 22px 48px rgba(0,0,0,0.6), 0 6px 18px rgba(0,0,0,0.3) inset;
        }

        .footer-icon { transition: transform .18s ease, box-shadow .18s ease; }
        .footer-icon:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
      `}</style>
    </footer>
  );
}

export default Footer;

const styles = {
  footer: {
    marginTop: 0,
    padding: "0 0 18px 0",
    background: "transparent",
    color: "var(--text)",
  },
  cardWrap: {
    maxWidth: 1100,
    margin: "40px auto 12px",
    padding: 20,
    borderRadius: 16,
    background: "linear-gradient(180deg,var(--card),var(--surface))",
    boxShadow: "0 18px 40px rgba(2,6,23,0.08), 0 6px 18px rgba(2,6,23,0.04) inset",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
    alignItems: "start",
    maxWidth: 1100,
    margin: "0 auto",
  },
  col: {
    minWidth: 160,
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  brandIcon: {
    fontSize: 30,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 800,
  },
  brandTag: {
    fontSize: 13,
    color: "var(--muted)",
  },
  desc: {
    color: "var(--muted)",
    fontSize: 14,
    lineHeight: 1.6,
    marginTop: 6,
  },
  colTitle: {
    fontWeight: 700,
    marginBottom: 8,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  link: {
    color: "var(--text)",
    textDecoration: "none",
    fontSize: 14,
  },
  contact: {
    color: "var(--muted)",
    fontSize: 14,
    marginBottom: 6,
  },
  socialRow: {
    marginTop: 10,
    display: "flex",
    gap: 8,
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "var(--card)",
    boxShadow: "var(--shadow-elevation)",
    textDecoration: "none",
    transition: "transform .18s ease, box-shadow .18s ease",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginTop: 18,
    marginBottom: 14,
  },
  copy: {
    textAlign: "center",
    color: "var(--muted)",
    fontSize: 13,
    margin: 0,
  },
};
