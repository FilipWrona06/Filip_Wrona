import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { noOrphans } from "@/lib/typography";

export const ogSize = { width: 1200, height: 630 };

// Statyczne wersje Archivo (800 i 400) przycięte do polskich znaków: obrazki
// do udostępniania mają ten sam krój co strona.
async function fonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [bold, regular] = await Promise.all([
    readFile(join(dir, "archivo-og-800.ttf")),
    readFile(join(dir, "archivo-og-400.ttf")),
  ]);
  return [
    { name: "Archivo", data: bold, weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
  ];
}

/** Wspólny szablon obrazka do udostępniania: papierowe tło, wrona, tytuł, adres. */
export async function ogImage({
  eyebrow,
  title,
  footer = "filipwrona.pl",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  footer?: string;
  dark?: boolean;
}) {
  const bg = dark ? "#141312" : "#f7f6f2";
  const fg = dark ? "#f7f6f2" : "#141312";
  const muted = dark ? "#a5a29b" : "#73716b";
  const size = title.length > 48 ? 70 : title.length > 26 ? 86 : 132;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          color: fg,
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30 }}>
          <svg width="52" height="30" viewBox="0 0 24 14">
            <path
              d="M1.5 2.5 C5 2.5 8.5 5.5 12 11 C15.5 5.5 19 2.5 22.5 2.5"
              fill="none"
              stroke="#6b4eff"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ fontWeight: 800 }}>Filip Wrona</span>
          <span style={{ color: muted, fontWeight: 400 }}>{eyebrow}</span>
        </div>
        <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.0, letterSpacing: -2.5, maxWidth: 1050 }}>
          {noOrphans(title)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: muted }}>
          <span>{footer}</span>
          <span style={{ display: "flex", width: 160, height: 6, background: "#6b4eff", borderRadius: 3, alignSelf: "center" }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
