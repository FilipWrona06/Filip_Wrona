"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { site } from "@/lib/site";
import { CrowMark } from "@/components/ui/CrowMark";
import { isActivePath } from "@/lib/nav";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Menu jest zawsze widoczne. Na górze strony to zwykły, przezroczysty pasek.
 * Po przewinięciu płynnie zamienia się w małą, półprzezroczystą „pigułkę”
 * na środku: napis zwęża się (oś szerokości fontu), a cienka fioletowa
 * linia na dole pokazuje postęp czytania strony.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  // podświetlenie w menu: podąża za kursorem, a bez kursora stoi na bieżącej stronie
  const [hovered, setHovered] = useState<string | null>(null);
  const activeHref = site.nav.find((i) => isActivePath(pathname, i.href))?.href ?? null;
  const highlight = hovered ?? activeHref;

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 80));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pill = compact && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          pill ? "px-3 pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`relative flex w-full items-center justify-between overflow-hidden transition-[max-width,height,padding,background-color,border-color,box-shadow,border-radius] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            pill
              ? "h-12 max-w-[620px] rounded-full border border-black/[0.07] bg-paper/88 px-2 pl-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              : "h-18 max-w-[1440px] rounded-none border border-transparent bg-transparent px-[clamp(1.25rem,4vw,3rem)]"
          } ${open ? "text-paper" : "text-ink"}`}
        >
          <Link
            href="/"
            aria-label="Filip Wrona, strona główna"
            className={`group relative z-10 flex items-center gap-2 font-bold tracking-tight whitespace-nowrap transition-[font-stretch,font-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              pill ? "text-[15px] [font-stretch:75%]" : "text-lg [font-stretch:125%]"
            }`}
          >
            <CrowMark className={`h-[0.62em] w-[1.1em] ${open ? "text-paper" : "text-violet"}`} />
            Filip Wrona
          </Link>

          <nav
            aria-label="Główna"
            className={`relative z-10 hidden items-center transition-[gap] duration-700 md:flex ${
              pill ? "gap-3" : "gap-5"
            }`}
          >
            <div className="flex items-center" onMouseLeave={() => setHovered(null)}>
              {site.nav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                    className={`relative rounded-full transition-[padding,font-size,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      pill ? "px-3 py-1 text-[13.5px]" : "px-4 py-1.5 text-[15px]"
                    } ${active ? "text-ink" : "text-ink/70 hover:text-ink"}`}
                  >
                    {highlight === item.href && (
                      <motion.span
                        layoutId="nav-highlight"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-ink/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/kontakt"
              aria-current={isActivePath(pathname, "/kontakt") ? "page" : undefined}
              className={`group relative aria-[current=page]:bg-violet inline-flex items-center overflow-hidden rounded-full bg-ink font-semibold text-paper transition-[height,padding,font-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                pill ? "h-8 px-4 text-[13px]" : "h-10 px-5 text-[14px]"
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full rounded-full bg-violet transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
              />
              <span className="relative">Kontakt</span>
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobilne"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-2.5 w-6">
              <motion.span
                className="absolute top-0 left-0 h-[1.5px] w-full bg-current"
                animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current"
                animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease }}
              />
            </span>
          </button>

          {/* Postęp czytania strony */}
          <motion.span
            aria-hidden
            className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-violet transition-opacity duration-500 ${
              pill ? "opacity-100" : "opacity-0"
            }`}
            style={{ scaleX: progress }}
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobilne"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pt-28 pb-10 text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <nav aria-label="Menu mobilne" className="flex flex-col gap-2">
              {[...site.nav, { label: "Kontakt", href: "/kontakt" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                    className="type-heading flex items-center gap-4 py-1 text-5xl aria-[current=page]:text-[#b3a4ff]"
                  >
                    {isActivePath(pathname, item.href) && (
                      <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet" />
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto space-y-1 text-smoke">
              <a href={`mailto:${site.email}`} className="block text-paper">
                {site.email}
              </a>
              <a href={site.phoneHref} className="block">
                {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
