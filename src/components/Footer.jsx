import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="footer-container">
          {/* BRAND */}
          <div className="footer-col">
            <div className="brand-row">
              <span className="brand-icon">🚗</span>
              <div>
                <div className="brand-name">CarRental</div>
                <div className="brand-tag">เช่ารถง่าย ทุกทริป</div>
              </div>
            </div>

            <p className="footer-desc">
              บริการเช่ารถออนไลน์ ครอบคลุมทุกจังหวัด
              พร้อมตัวเลือกประกันและบริการรับ-ส่ง
            </p>
          </div>

          {/* LINKS */}
          <div className="footer-col">
            <div className="footer-title">ลิงก์ด่วน</div>
            <ul className="footer-list">
              <li><a href="/cars">รถทั้งหมด</a></li>
              <li><a href="/booking/1">จองรถ</a></li>
              <li><a href="/profile">บัญชีของฉัน</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-col">
            <div className="footer-title">ติดต่อ</div>
            <div className="footer-contact">support@carrental.example</div>
            <div className="footer-contact">โทร: 02-123-4567</div>

            <div className="social-row">
              <a href="#" className="social-icon">🌐</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <p className="footer-copy">
          © {new Date().getFullYear()} CarRental • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
