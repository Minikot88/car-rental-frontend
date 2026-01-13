// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="page container">
      <section
        className="hero"
      >
        {/* Left — Text */}
        <div>
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              marginBottom: "0.6rem",
              lineHeight: "1.3",
            }}
          >
            จองรถเช่าขับเอง
            <br />
            <span style={{ color: "var(--primary)" }}>
              สะดวก รวดเร็ว ปลอดภัย
            </span>
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 500,
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}
          >
            ระบบจองรถออนไลน์ที่ใช้งานง่าย พร้อมค้นหาวันว่างแบบเรียลไทม์
            เลือกรถที่เหมาะกับการเดินทางของคุณ จองได้ภายในไม่กี่ขั้นตอน
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link to="/cars">
              <button className="btn btn-primary">เริ่มจองรถตอนนี้</button>
            </Link>

            <button
              className="btn btn-outline"
              onClick={scrollToFeatures}
              aria-controls="features"
            >
              ดูรายละเอียดบริการ
            </button>
          </div>

          <div
            style={{
              marginTop: "1.2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <span>✓ ฟรี! ยกเลิกภายในเวลาที่กำหนด</span>
            <span>✓ มีประกันพื้นฐาน</span>
            <span>✓ รับ–คืนรถที่สนามบิน</span>
          </div>
        </div>

        {/* Right — Highlight Car Box */}
        <div className="highlight">
          <div className="highlight-bg" />

          <div className="highlight-card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              {/* Left Text */}
              <div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    marginBottom: 6,
                  }}
                >
                  รถยอดนิยมประจำเดือน
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.18rem",
                  }}
                >
                  Toyota Yaris 1.2
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Eco car · 5 ที่นั่ง · ออโต้
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    marginBottom: 6,
                  }}
                >
                  ราคาพิเศษเริ่มต้น
                </div>

                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "var(--primary)",
                  }}
                >
                  1,200฿
                </div>

                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                  }}
                >
                  / วัน
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "0.6rem",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.86rem",
              }}
            >
              <span>✓ รับ–คืนสนามบิน</span>
              <span>✓ ฟรีค่ามัดจำบัตรเครดิต</span>
            </div>
          </div>

          <div className="highlight-emoji">🚗</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ marginTop: "2.5rem" }}>
        <div className="page-header" style={{ marginBottom: "1.5rem" }}>
          <h2 className="page-title" style={{ textAlign: "center" }}>
            ทำไมต้องจองกับเรา?
          </h2>

          <p
            className="page-subtitle"
            style={{
              textAlign: "center",
              maxWidth: 580,
              margin: "0.2rem auto 1.5rem",
              color: "var(--text-muted)",
            }}
          >
            ระบบจองรถเช่าออนไลน์ที่ออกแบบมาให้ใช้งานง่าย
            รองรับมือถือและใช้งานร่วมกับฐานข้อมูลจริงได้
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3>จองง่ายภายในไม่กี่ขั้นตอน</h3>
            <p className="muted">
              เลือกวันที่ เลือกรถ กดยืนยัน ระบบจะบันทึกข้อมูลอัตโนมัติ
              สะดวกแม้ใช้ผ่านมือถือ
            </p>
          </div>

          <div className="card">
            <h3>รองรับมือถือ 100%</h3>
            <p className="muted">
              หน้าเว็บเป็น responsive เต็มระบบ ใช้งานได้ดีในทุกขนาดหน้าจอ
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ textAlign: "center" }}>รถแนะนำสำหรับคุณ</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div className="card" style={{ padding: "1rem" }}>
            <div style={{ fontWeight: 800 }}>Honda City</div>
            <div style={{ color: "var(--text-muted)", marginTop: 6 }}>Sedan · 5 ที่นั่ง · ออโต้</div>
            <div style={{ marginTop: 10, fontWeight: 800, color: "var(--primary)" }}>1,350฿ <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.85rem" }}>/ วัน</span></div>
            <div style={{ marginTop: 12 }}>
              <Link to="/cars"><button className="btn btn-outline">ดูรายละเอียด</button></Link>
            </div>
          </div>

          <div className="card" style={{ padding: "1rem" }}>
            <div style={{ fontWeight: 800 }}>Toyota Yaris</div>
            <div style={{ color: "var(--text-muted)", marginTop: 6 }}>Eco car · 5 ที่นั่ง · ออโต้</div>
            <div style={{ marginTop: 10, fontWeight: 800, color: "var(--primary)" }}>1,200฿ <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.85rem" }}>/ วัน</span></div>
            <div style={{ marginTop: 12 }}>
              <Link to="/cars"><button className="btn btn-outline">ดูรายละเอียด</button></Link>
            </div>
          </div>

          <div className="card" style={{ padding: "1rem" }}>
            <div style={{ fontWeight: 800 }}>Mazda CX-3</div>
            <div style={{ color: "var(--text-muted)", marginTop: 6 }}>Crossover · 5 ที่นั่ง · ออโต้</div>
            <div style={{ marginTop: 10, fontWeight: 800, color: "var(--primary)" }}>1,700฿ <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.85rem" }}>/ วัน</span></div>
            <div style={{ marginTop: 12 }}>
              <Link to="/cars"><button className="btn btn-outline">ดูรายละเอียด</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Removed inline :root and button styles to rely on global theme variables in src/index.css and src/styles/global.css */}
    </div>
  );
}

export default Home;
