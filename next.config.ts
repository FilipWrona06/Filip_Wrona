import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy: strona może wczytywać skrypty, style, fonty i dane
 * tylko z własnej domeny. Blokuje to wstrzykiwanie obcych skryptów (XSS)
 * i osadzanie strony w cudzych ramkach (clickjacking).
 * 'unsafe-inline' jest potrzebne dla skryptów startowych Next.js i danych JSON-LD;
 * 'unsafe-eval' i websocket tylko w trybie deweloperskim (odświeżanie na żywo).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // tylko HTTPS przez 2 lata, także dla subdomen
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // obrazki zmieniają się rzadko: optymalizowane wersje trzymamy w pamięci podręcznej 31 dni
    minimumCacheTTL: 2678400,
    // Okładki realizacji pobierane ze stron klientów (do czasu podmiany na lokalne zrzuty ekranu)
    remotePatterns: [
      { protocol: "https", hostname: "www.upadlosckonsumenckachorzow.pl" },
      { protocol: "https", hostname: "upadlosckonsumenckachorzow.pl" },
      { protocol: "https", hostname: "www.maxime.com.pl" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
