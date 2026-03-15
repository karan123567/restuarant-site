export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0F0D0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "80px",
            fontWeight: 300,
            color: "#C9A96E",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "13px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.4)",
            marginTop: "16px",
          }}
        >
          Page not found
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "32px",
            padding: "12px 32px",
            border: "1px solid rgba(201,169,110,0.4)",
            color: "#C9A96E",
            fontFamily: "sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Back to home
        </a>
      </div>
    </div>
  );
}