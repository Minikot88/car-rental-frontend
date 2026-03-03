import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page container home-page">
      {/* ================= HERO ================= */}
      <section className="hero">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <div className="hero-badge-top">✨ บริการเช่ารถอันดับ 1</div>
          <h1 className="hero-title">
            จองรถเช่าขับเอง <br />
            <span className="primary">สะดวก รวดเร็ว ปลอดภัย</span>
          </h1>

          <p className="hero-desc">
            แพลตฟอร์มจองรถเช่าออนไลน์ที่ออกแบบมาเพื่อความง่ายและรวดเร็ว
            ตรวจสอบรถว่างแบบเรียลไทม์ เห็นราคาชัดเจนก่อนยืนยัน
            ไม่มีค่าใช้จ่ายแอบแฝง จองได้ทันทีภายในไม่กี่คลิก
          </p>

          <p className="hero-highlight-text">
            ให้การเดินทางของคุณเป็นเรื่องง่าย ไม่ว่าจะทริปท่องเที่ยว
            เดินทางธุรกิจ หรือรับส่งสนามบิน เราพร้อมดูแลทุกเส้นทาง
          </p>

          <div className="hero-actions">
            <Link to="/search" className="btn btn-primary">
              เริ่มจองรถ
            </Link>
            <button
              type="button"
              className="btn btn-outline"
              onClick={scrollToFeatures}
            >
              ดูรายละเอียดบริการ
            </button>
          </div>

          <div className="hero-badges">
            <span><i className="icon">✓</i> ยกเลิกฟรี</span>
            <span><i className="icon">✓</i> มีประกันพื้นฐาน</span>
            <span><i className="icon">✓</i> รับ–คืนสนามบิน</span>
            <span><i className="icon">✓</i> ไม่มีบัตรเครดิตก็จองได้</span>
          </div>
        </div>

        {/* RIGHT CONTENT (HIGHLIGHT CARD) */}
        <div className="highlight">
          <div className="highlight-bg" />

          <div className="highlight-card">
            {/* เพิ่มรูปภาพรถให้ดูพรีเมียมขึ้น */}
            <div className="highlight-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80" 
                alt="Toyota Yaris" 
                className="highlight-image"
              />
            </div>

            <div className="highlight-top">
              <div>
                <div className="muted small">รถยอดนิยมประจำเดือน</div>
                <div className="highlight-title">Toyota Yaris 1.2</div>
                <div className="muted small">Eco car · 5 ที่นั่ง · ออโต้</div>
              </div>

              <div className="price-box">
                <div className="muted small text-right">เริ่มต้น</div>
                <div className="price">1,200฿</div>
                <div className="muted xsmall text-right">/ วัน</div>
              </div>
            </div>

            <div className="highlight-bottom">
              <span className="badge-pill">✈️ รับ–คืนสนามบิน</span>
              <span className="badge-pill">💳 ไม่ต้องใช้บัตรเครดิต</span>
            </div>
          </div>

          <div className="highlight-emoji">🚗</div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="section features-section">
        <div className="section-header">
          <h2>ทำไมต้องจองกับเรา?</h2>
          <p className="muted center max-w-xl mx-auto">
            เรามุ่งเน้นความโปร่งใส ความสะดวก และประสบการณ์ใช้งานที่ดีที่สุด
            เพื่อให้คุณมั่นใจทุกครั้งที่เลือกใช้บริการ
          </p>
        </div>

        <div className="grid grid-features">
          <div className="card">
            <div className="card-icon">🚀</div>
            <h3>จองง่ายภายในไม่กี่ขั้นตอน</h3>
            <p className="muted">
              เลือกวันที่ เลือกรถ และยืนยันการจองได้ทันที
              ระบบออกแบบให้ใช้งานง่าย ไม่ซับซ้อน แม้ไม่เคยจองออนไลน์มาก่อน
            </p>
          </div>

          <div className="card">
            <div className="card-icon">📱</div>
            <h3>รองรับทุกอุปกรณ์</h3>
            <p className="muted">
              ใช้งานได้ลื่นไหลทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์
              ไม่ว่าคุณจะจองจากที่ไหน ก็สะดวกเหมือนกัน
            </p>
          </div>

          <div className="card">
            <div className="card-icon">⏱</div>
            <h3>ตรวจสอบรถว่างเรียลไทม์</h3>
            <p className="muted">
              ข้อมูลรถอัปเดตจากระบบจริง ลดความผิดพลาดในการจอง
              มั่นใจได้ว่ารถที่คุณเลือกพร้อมใช้งาน
            </p>
          </div>

          <div className="card">
            <div className="card-icon">💰</div>
            <h3>ราคาโปร่งใส ไม่มีแอบแฝง</h3>
            <p className="muted">
              แสดงราคาชัดเจนก่อนยืนยัน ไม่มีค่าธรรมเนียมซ่อน
              ช่วยให้คุณวางแผนงบประมาณได้ง่าย
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🛡</div>
            <h3>มีประกันพื้นฐานทุกคัน</h3>
            <p className="muted">
              เพิ่มความอุ่นใจทุกการเดินทาง พร้อมเงื่อนไขชัดเจน
              มั่นใจได้ในความปลอดภัยตลอดเส้นทาง
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🤝</div>
            <h3>ระบบจัดการมืออาชีพ</h3>
            <p className="muted">
              บริหารจัดการการจองอย่างเป็นระบบ
              พร้อมทีมงานบริการช่วยเหลือหากเกิดปัญหาระหว่างเช่า
            </p>
          </div>
        </div>

        {/* 🔥 ปิดการขาย */}
        <div className="cta-bottom">
          <div className="cta-content">
            <h2>พร้อมออกเดินทางแล้วหรือยัง?</h2>
            <p className="muted">เลือกรถที่ใช่ สำหรับทริปต่อไปของคุณได้เลย</p>
            <Link to="/search" className="btn btn-primary btn-lg mt-4">
              ค้นหารถว่างตอนนี้ ➔
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;