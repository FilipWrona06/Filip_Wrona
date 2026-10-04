import { ImageResponse } from "next/og";

export const alt = "Filip Wrona, strony internetowe dla firm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Obrazek wyświetlany przy udostępnianiu linku (Facebook, LinkedIn, Messenger).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 34, color: "#a3a3a3" }}>Strony internetowe dla firm</div>
        <div style={{ fontSize: 170, fontWeight: 800, letterSpacing: -8, lineHeight: 0.9 }}>
          Filip Wrona
        </div>
        <div style={{ fontSize: 30, color: "#a3a3a3" }}>filipwrona.pl</div>
      </div>
    ),
    size,
  );
}
