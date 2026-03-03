import { useEffect, useState } from "react";
import {
  FaFileContract,
  FaIdCard,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";
import "./styles/Terms.css";

export default function Terms() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const downloadPDF = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "/terms-pdf";
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 5000);
  };

  return (
    <div className={`container terms-page ${visible ? "fade-in" : ""}`}>

      {/* HEADER */}
      <div className="terms-header">
        <h1>เงื่อนไขการเช่ารถ</h1>

        <button
          className="btn btn-primary btn-mini"
          onClick={downloadPDF}
        >
          ดาวน์โหลด PDF
        </button>
      </div>

      {/* SECTION 1 */}
      <div className="card terms-card slide-up">
        <div className="terms-title">
          <FaFileContract className="icon" />
          1. เงื่อนไขการเช่ารถ
        </div>

        <ul>
          <li><FaClock className="list-icon" /> 1.1 ชั่วโมงในการเช่า 24 ชั่วโมง ฟรีเกินได้ 1 ชั่วโมง</li>
          <li><FaClock className="list-icon" /> 1.2 ส่งรถช้าจากเวลาที่กำหนดไว้ ปรับ 100 บาท ต่อ 1 ชั่วโมง</li>
          <li><FaClock className="list-icon" /> 1.3 ส่งรถช้าเกิน 5 ชั่วโมง คิดเป็น 1 วัน</li>
          <li><FaUserCheck className="list-icon" /> 1.4 ผู้ขับขี่ต้องทำเอกสารด้วยตนเองเท่านั้น</li>
          <li><FaUserCheck className="list-icon" /> 1.5 เอกสารการเช่ารถต้องเป็นคนเดียวกับผู้ทำสัญญาเท่านั้น</li>
          <li><FaFileContract className="list-icon" /> 1.6 ฟรีค่ามัดจำ เมื่อลูกค้าแสดงตั๋วเครื่องบิน</li>
        </ul>
      </div>

      {/* SECTION 2 */}
      <div className="card terms-card slide-up delay">
        <div className="terms-title">
          <FaIdCard className="icon" />
          2. เอกสาร หลักฐาน การเช่ารถ
        </div>

        <ul>
          <li><FaIdCard className="list-icon" /> 2.1 สำเนาบัตรประชาชน</li>
          <li><FaIdCard className="list-icon" /> 2.2 สำเนาใบขับขี่</li>
        </ul>
      </div>

    </div>
  );
}