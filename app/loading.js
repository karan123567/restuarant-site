export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#0F0D0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Animated gold bar */}
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "#C9A96E",
            animation: "loadExpand 1.2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.6)",
          }}
        >
          Loading
        </span>
      </div>

      <style>{`
        @keyframes loadExpand {
          0%, 100% { transform: scaleX(0.3); opacity: 0.4; }
          50%       { transform: scaleX(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  );
}