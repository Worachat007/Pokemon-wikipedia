import Link from "next/link";

export const metadata = {
  title: "About This Project | Pokémon App",
  description: "Developer information and source code for the Pokémon app project",
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 16px",
        background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 20,
            color: "#2563eb",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← กลับหน้าแรก
        </Link>

        <div
          style={{
            borderRadius: 32,
            padding: "24px 20px",
            background: "#ffffff",
            boxShadow: "0 24px 50px rgba(15, 23, 42, 0.12)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              padding: 24,
              borderRadius: 24,
              background: "linear-gradient(135deg, #ef4444 0%, #3b82f6 100%)",
              color: "#ffffff",
              marginBottom: 24,
            }}
          >
            <h1 style={{ margin: "0 0 10px", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}>
              About This Project
            </h1>
            <p style={{ margin: 0, lineHeight: 1.7, color: "rgba(255,255,255,0.95)" }}>
              แพลตฟอร์มแสดงข้อมูลโปเกม่อนที่พัฒนาด้วย Next.js และ Material UI
              โดยใช้ PokeAPI เพื่อดึงข้อมูลโปเกม่อนและแสดงรายละเอียดต่าง ๆ แบบเรียบง่ายและเข้าใจง่าย
            </p>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                padding: 20,
                borderRadius: 20,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ margin: "0 0 10px", fontSize: "clamp(1rem, 2.2vw, 1.1rem)", color: "#111827" }}>
                📌 Project Overview
              </h2>
              <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.7 }}>
                โครงการนี้ออกแบบมาเพื่อให้ผู้ใช้สามารถค้นหาโปเกม่อน ดูรายละเอียด และเรียนรู้ข้อมูลเบื้องต้นของแต่ละตัวผ่านหน้าเว็บที่สวยงามและใช้งานง่าย
              </p>
            </div>

            <div
              style={{
                padding: 20,
                borderRadius: 20,
                background: "linear-gradient(135deg, #fef2f2 0%, #eff6ff 100%)",
                border: "1px solid #dbeafe",
              }}
            >
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1rem, 2.2vw, 1.1rem)", color: "#111827" }}>
                👤 Developer Information
              </h2>
              <div style={{ display: "grid", gap: 6 }}>
                <p style={{ margin: 0, color: "#111827", fontWeight: 700 }}>
                  Mr. Worachat Pidtanang
                </p>
                <p style={{ margin: 0, color: "#374151" }}>
                  Student ID: 673450039-8
                </p>
                <p style={{ margin: 0, color: "#374151" }}>
                  Course: Front-end Web Programming
                </p>
                <p style={{ margin: 0, color: "#374151" }}>
                  Program: Computer Science
                </p>
                <p style={{ margin: 0, color: "#374151" }}>
                  University: Khon Kaen University, Nong Khai Campus
                </p>
              </div>
            </div>

            <div
              style={{
                padding: 20,
                borderRadius: 20,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ margin: "0 0 10px", fontSize: "clamp(1rem, 2.2vw, 1.1rem)", color: "#111827" }}>
                🔗 Source Code
              </h2>
              <p style={{ margin: "0 0 14px", color: "#4b5563", lineHeight: 1.7 }}>
                คุณสามารถดูโค้ดต้นฉบับของโปรเจกต์นี้ได้จาก GitHub ด้านล่าง
              </p>
              <a
                href="https://github.com/Worachat007/Pokemon-wikipedia"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "#2563eb",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                GitHub Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
