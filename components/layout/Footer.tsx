import Link from "next/link";
import { site } from "@/lib/site";
import { StretchWord } from "@/components/motion/StretchWord";
import { Seal } from "@/components/ui/Seal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    // Na większych ekranach stopka jest przypięta pod treścią (sticky):
    // treść odjeżdża i odsłania ją bez żadnego JavaScriptu w trakcie przewijania.
    <footer className="relative z-0 bg-ink text-paper md:sticky md:bottom-0">
      <div className="container-site pt-24 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="type-lead max-w-md text-xl text-smoke">
              Masz pomysł albo po prostu pytanie? Napisz, odpowiem w ciągu jednego dnia roboczego.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-draw type-heading mt-6 inline-block text-3xl break-all md:text-4xl"
            >
              {site.email}
            </a>
          </div>
          <nav
            aria-label="Stopka"
            className="grid grid-cols-2 gap-8 text-[15px] md:col-span-6 md:grid-cols-3"
          >
            <ul className="space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontakt" className="link-draw">
                  Kontakt
                </Link>
              </li>
            </ul>
            <ul className="space-y-3">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 text-smoke">
              <li>
                <a href={site.phoneHref} className="link-draw">
                  {site.phone}
                </a>
              </li>
              <li>{site.area}</li>
            </ul>
          </nav>
        </div>

        <div className="mt-24 select-none" aria-hidden>
          <StretchWord text="Filip Wrona" interactive />
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-sm text-smoke md:flex-row">
          <p className="flex items-center gap-3">
            <Seal id="footer" className="h-9 w-9 -rotate-3 text-violet" />© {year} Filip Wrona
          </p>
          {/* TODO: po założeniu działalności dodaj tu NIP */}
          <Link href="/polityka-prywatnosci" className="link-draw">
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
