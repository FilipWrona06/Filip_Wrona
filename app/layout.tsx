import type { Metadata, Viewport } from "next";
import "./globals.css";
import { archivo } from "./fonts";
import { site } from "@/lib/site";
import { JsonLd, siteGraph } from "@/lib/seo";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorLabel } from "@/components/layout/CursorLabel";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollBackdrop } from "@/components/layout/ScrollBackdrop";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Tworzenie stron internetowych dla firm | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: `Tworzenie stron internetowych dla firm | ${site.name}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Kod weryfikacyjny Google Search Console: ustaw zmienną GOOGLE_SITE_VERIFICATION
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={archivo.variable}>
      <body>
        <JsonLd data={siteGraph()} />
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-paper"
        >
          Przejdź do treści
        </a>
        <Providers>
          <CursorLabel />
          <PageTransition />
          <Header />
          <main id="tresc" tabIndex={-1} className="relative z-10 bg-paper outline-none">
            <ScrollBackdrop />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
