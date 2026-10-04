"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Tekst „czytany” przewijaniem: kolejne słowa ciemnieją z szarego do czerni tuszu
 * dokładnie w tempie przewijania. Przez cały czas są czytelne (kontrast zgodny z WCAG).
 * JavaScript ustawia jedną zmienną CSS (--p, postęp 0–1), a kolor każdego słowa
 * wylicza sam CSS (app/globals.css: .sw-word), więc efekt prawie nic nie kosztuje.
 */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // postęp 0, gdy początek tekstu jest na 85% wysokości ekranu; 1, gdy koniec jest na 50%
      const start = vh * 0.85;
      const end = vh * 0.5;
      const p = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className} style={{ "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} className="sw-word" style={{ "--i": i } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
