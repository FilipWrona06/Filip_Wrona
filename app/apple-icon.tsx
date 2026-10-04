import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Ikona na ekran główny iPhone’a / Androida: biała wrona na czarnym tle.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#141312" }}>
        <svg width="112" height="66" viewBox="0 0 24 14">
          <path d="M1.5 2.5 C5 2.5 8.5 5.5 12 11 C15.5 5.5 19 2.5 22.5 2.5" fill="none" stroke="#f7f6f2" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
