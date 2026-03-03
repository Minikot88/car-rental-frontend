import { Link } from "react-router-dom";
import "./styles/NotFound.css";

export default function NotFound() {
  const launchDate = "01/05/2026"; // 🔥 เปลี่ยนวันที่ตรงนี้

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="code">404</h1>

        <h2>กำลังพัฒนา</h2>

        <p className="message">
          ขออภัย หน้านี้อยู่ระหว่างการพัฒนา
        </p>

        <div className="launch-box">
          🚀 เปิดให้บริการวันที่ <strong>{launchDate}</strong>
        </div>

        <Link to="/" className="home-btn">
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}