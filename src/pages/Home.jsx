// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page" style={{ padding: "2rem 1.5rem" }}>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* Left — Text */}
        <div>
          <h1
            style={{
              fontSize: "2.3rem",
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

            <a href="#features">
              <button className="btn btn-outline">ดูรายละเอียดบริการ</button>
            </a>
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
        <div
          style={{
            position: "relative",
            height: "230px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 0% 0%, #ffb3b3, transparent 60%), radial-gradient(circle at 100% 100%, #ffe5e5, transparent 60%)",
              borderRadius: "24px",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: "16px",
              background: "#fff",
              borderRadius: "22px",
              padding: "1.2rem 1.3rem",
              boxShadow: "0 18px 42px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Left Text */}
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginBottom: 4,
                  }}
                >
                  รถยอดนิยมประจำเดือน
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.15rem",
                  }}
                >
                  Toyota Yaris 1.2
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
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
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  ราคาพิเศษเริ่มต้น
                </div>

                <div
                  style={{
                    fontSize: "1.35rem",
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
                marginTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.82rem",
              }}
            >
              <span>✓ รับ–คืนสนามบิน</span>
              <span>✓ ฟรีค่ามัดจำบัตรเครดิต</span>
            </div>
          </div>
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

        <div
          className="grid grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.2rem",
          }}
        >
          <div className="card" style={styles.card}>
            <h3>จองง่ายภายในไม่กี่ขั้นตอน</h3>
            <p style={styles.textMuted}>
              เลือกวันที่ เลือกรถ กดยืนยัน ระบบจะบันทึกข้อมูลอัตโนมัติ
              สะดวกแม้ใช้ผ่านมือถือ
            </p>
          </div>

          <div className="card" style={styles.card}>
            <h3>รองรับมือถือ 100%</h3>
            <p style={styles.textMuted}>
              หน้าเว็บเป็น responsive เต็มระบบ ใช้งานได้ดีในทุกขนาดหน้าจอ
            </p>
          </div>
        </div>
      </section>

      <style>
        {`
        :root {
          --primary: #ff0000;
          --text-muted: #777;
        }

        .btn {
          padding: 10px 16px;
          font-size: 0.95rem;
          border-radius: 8px;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: var(--primary);
          color: #fff;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--primary);
          color: var(--primary);
        }

        .btn-outline:hover {
          background: var(--primary);
          color: #fff;
        }

        @media (max-width: 900px) {
          section:first-of-type {
            grid-template-columns: 1fr;
          }
        }
      `}
      </style>
    </div>
  );
}

export default Home;

const styles = {
  card: {
    background: "#fff",
    padding: "1.2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },
  textMuted: {
    color: "var(--text-muted)",
    marginTop: "0.4rem",
    lineHeight: "1.6",
  },
};
