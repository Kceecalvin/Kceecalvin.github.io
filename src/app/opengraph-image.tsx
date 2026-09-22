import { ImageResponse } from "next/og";
export const alt = "CALDEV — Kencalvin Mwenda. A little different. By design.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f7f6f2",
        color: "#172748",
        width: "100%",
        height: "100%",
        padding: "55px 65px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          letterSpacing: 2,
          color: "#536582",
        }}
      >
        <span>INDEPENDENT DESIGN & DEVELOPMENT</span>
        <span>NAIROBI, KENYA</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <span
          style={{
            fontSize: 191,
            fontWeight: 700,
            letterSpacing: -14,
            color: "#294fdf",
            lineHeight: 1.2,
          }}
        >
          CALDEV
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 145,
            height: 145,
            borderRadius: 80,
            background: "#e2f39a",
            fontSize: 100,
            color: "#172748",
          }}
        >
          +
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          fontSize: 47,
          letterSpacing: -2,
        }}
      >
        A little different. By design.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          borderTop: "1px solid #ccd5e5",
          paddingTop: 25,
          fontSize: 17,
          color: "#536582",
        }}
      >
        <span>Kencalvin Mwenda / CALDEV</span>
        <span>Websites. Products. Thoughtful details.</span>
      </div>
    </div>,
    { ...size },
  );
}
