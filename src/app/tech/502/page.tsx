import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IFAN 502 | Technical Specifications",
  description: "IFAN Group product technical documentation - 501 series.",
  robots: { index: false, follow: false },
};

export default function Tech501Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d1b2a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
        color: "#ffffff",
        padding: "2rem",
      }}
    >
      {/* Logo area */}
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            color: "#4a9eff",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            fontWeight: 600,
          }}
        >
          IFAN GROUP
        </div>
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #4a9eff, transparent)",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Main card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(74,158,255,0.2)",
          borderRadius: "20px",
          padding: "3rem 3.5rem",
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,158,255,0.05) inset",
        }}
      >
        {/* Product badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(74,158,255,0.12)",
            border: "1px solid rgba(74,158,255,0.3)",
            borderRadius: "100px",
            padding: "6px 18px",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4a9eff",
              boxShadow: "0 0 8px #4a9eff",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.8rem", color: "#4a9eff", fontWeight: 600, letterSpacing: "0.1em" }}>
            系列 · 502
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            marginBottom: "0.75rem",
            lineHeight: 1.2,
            background: "linear-gradient(135deg, #ffffff 0%, #a8c8ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          技术规格文档
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.9rem",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          内容正在整理中，即将上线
          <br />
          Content coming soon
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(74,158,255,0.3), transparent)",
            marginBottom: "2rem",
          }}
        />

        {/* Contact */}
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>
          如需了解产品详情，请联系我们的技术团队
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "2.5rem",
          color: "rgba(255,255,255,0.2)",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
        }}
      >
        © {new Date().getFullYear()} IFAN Group · ifanholding.com
      </div>
    </main>
  );
}
