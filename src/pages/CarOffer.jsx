import { Link } from "react-router-dom";
import "./styles/CarOffer.css";

export default function CarOffer() {
  return (
    <div className="booking-like-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/cars">← กลับไปที่ผลการค้นหา</Link>
      </div>

      <h1 className="page-title">ข้อเสนอสำหรับท่าน</h1>
      <p className="page-subtitle">ขั้นถัดไป: เพิ่มบริการเสริม</p>

      {/* FREE CANCEL */}
      <div className="alert success">
        ✔ ยกเลิกฟรีจนถึง 48 ชั่วโมงก่อนรับรถ
      </div>

      <div className="layout">
        {/* LEFT */}
        <div className="left">
          <div className="car-box">
            <img
              src="https://wwjcar.com/wp-content/uploads/2018/12/car-05.webp"
              alt="Honda City"
            />

            <div className="car-info">
              <h2>Honda City</h2>

              <div className="rating">
                <span className="score">9.3</span>
                <span>ดีเลิศ · 800+ รีวิว</span>
              </div>

              <p className="meta">
                🚘 Sedan · 👥 5 ที่นั่ง · ⚙️ อัตโนมัติ
              </p>

              <ul className="benefits">
                <li>✔ ไม่ต้องวางมัดจำ</li>
                <li>✔ ยกเลิกฟรี</li>
                <li>✔ ประกันพื้นฐานรวมแล้ว</li>
                <li>✔ ไม่จำกัดระยะทาง</li>
              </ul>

              <div className="highlight">
                ⭐ ตัวเลือกดีเยี่ยม!
              </div>
            </div>
          </div>

          {/* SOCIAL PROOF */}
          <div className="social-proof">
            <h3>ลูกค้าชอบสิ่งนี้เพราะ</h3>
            <div className="tags">
              <span>การบริการ</span>
              <span>ความสะอาด</span>
              <span>รับรถรวดเร็ว</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="summary sticky">
            <h3>สรุปการจอง</h3>

            <div className="summary-block">
              <strong>รับรถ</strong>
              <p>📍 สนามบินภูเก็ต</p>
              <p>🕒 18 ม.ค. 2026 · 16:00</p>
            </div>

            <div className="summary-block">
              <strong>คืนรถ</strong>
              <p>📍 สนามบินภูเก็ต</p>
              <p>🕒 19 ม.ค. 2026 · 10:00</p>
            </div>

            <hr />

            <div className="price-row">
              <span>ค่าเช่า 1 วัน</span>
              <strong>THB 1,703.70</strong>
            </div>

            <div className="price-total">
              รวมทั้งหมด <strong>THB 1,703.70</strong>
            </div>

            <Link to="/booking/honda-city" className="cta">
              ดำเนินการต่อ
            </Link>

            <p className="small-note">
              ราคานี้ถูกกว่าค่าเฉลี่ยในช่วงวันที่คุณเลือก
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
