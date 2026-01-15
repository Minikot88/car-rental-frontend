import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page container">
      {/* ================= HERO ================= */}
      <section className="hero">
        {/* LEFT */}
        <div className="hero-left">
          <h1 className="hero-title">
            จองรถเช่าขับเอง
            <br />
            <span className="primary">สะดวก รวดเร็ว ปลอดภัย</span>
          </h1>

          <p className="hero-desc">
            ระบบจองรถออนไลน์ที่ใช้งานง่าย ตรวจสอบรถว่างแบบเรียลไทม์
            เลือกรถที่เหมาะกับการเดินทางของคุณ จองได้ภายในไม่กี่ขั้นตอน
          </p>

          <div className="hero-actions">
            <Link to="/cars">
              <button className="btn btn-primary">เริ่มจองรถ</button>
            </Link>

            <button className="btn btn-outline" onClick={scrollToFeatures}>
              ดูรายละเอียดบริการ
            </button>
          </div>

          <div className="hero-badges">
            <span>✓ ยกเลิกฟรี</span>
            <span>✓ มีประกันพื้นฐาน</span>
            <span>✓ รับ–คืนสนามบิน</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="highlight">
          <div className="highlight-bg" />

          <div className="highlight-card">
            <div className="highlight-top">
              <div>
                <div className="muted small">รถยอดนิยมประจำเดือน</div>
                <div className="highlight-title">Toyota Yaris 1.2</div>
                <div className="muted small">
                  Eco car · 5 ที่นั่ง · ออโต้
                </div>
              </div>

              <div className="price-box">
                <div className="muted small">เริ่มต้น</div>
                <div className="price">1,200฿</div>
                <div className="muted xsmall">/ วัน</div>
              </div>
            </div>

            <div className="highlight-bottom">
              <span>✓ รับ–คืนสนามบิน</span>
              <span>✓ ไม่ต้องใช้บัตรเครดิต</span>
            </div>
          </div>

          <div className="highlight-emoji">🚗</div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="section">
        <div className="section-header">
          <h2>ทำไมต้องจองกับเรา?</h2>
          <p className="muted center">
            ระบบจองรถเช่าออนไลน์ที่ออกแบบมาให้ใช้งานง่าย
            รองรับมือถือและเชื่อมต่อฐานข้อมูลจริง
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3>จองง่ายภายในไม่กี่ขั้นตอน</h3>
            <p className="muted">
              เลือกวันที่ เลือกรถ กดยืนยัน ระบบบันทึกข้อมูลอัตโนมัติ
            </p>
          </div>

          <div className="card">
            <h3>รองรับทุกอุปกรณ์</h3>
            <p className="muted">
              Responsive 100% ใช้งานได้ดีทุกอุปกรณ์
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
