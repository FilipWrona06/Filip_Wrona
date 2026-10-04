"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  text: string;
  /** true: litery reagują na kursor na całej stronie (hero). */
  interactive?: boolean;
  /** true: na starcie litery „rozprężają się” od wąskich do pełnej szerokości. */
  intro?: boolean;
  className?: string;
};

const MIN = 62; // najwęższa szerokość fontu (font-stretch, %)
const MAX = 125; // najszersza
const REST = 100;
const weightFor = (stretch: number) => Math.round(500 + ((stretch - MIN) / (MAX - MIN)) * 400);

/**
 * Znak rozpoznawczy marki: napis rozciągnięty na całą szerokość,
 * którego litery zmieniają szerokość (oś wdth fontu zmiennego) w zależności
 * od położenia kursora. Litery najbliżej kursora rozszerzają się i pogrubiają,
 * dalsze zwężają, więc napis „oddycha” pod ręką użytkownika.
 */
export function StretchWord({ text, interactive = false, intro = false, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);
  const current = useRef<number[]>([]);
  const target = useRef<number[]>([]);
  const tint = useRef<number[]>([]);
  const tintTarget = useRef<number[]>([]);
  // środki liter (w spoczynku) względem lewej krawędzi napisu: liczone raz,
  // dzięki czemu w pętli animacji nie odczytujemy układu strony
  const centers = useRef<number[]>([]);
  // pozycja kursora względem napisu (null = kursor daleko)
  const pointer = useRef<number | null>(null);
  const raf = useRef<number>(0);
  const inView = useRef(true);

  const chars = Array.from(text);

  const apply = (el: HTMLSpanElement, stretch: number) => {
    el.style.fontStretch = `${stretch.toFixed(2)}%`;
    el.style.fontWeight = `${weightFor(stretch)}`;
  };

  // Dopasowanie rozmiaru fontu tak, aby napis wypełniał całą szerokość kontenera.
  const fit = useCallback(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;
    letters.current.forEach((el) => apply(el, REST));
    line.style.fontSize = "100px";
    const ratio = wrap.clientWidth / line.scrollWidth;
    line.style.fontSize = `${Math.floor(100 * ratio * 0.99 * 100) / 100}px`;
    const wl = wrap.getBoundingClientRect().left;
    centers.current = letters.current.map((el) => {
      const r = el.getBoundingClientRect();
      return r.left - wl + r.width / 2;
    });
    letters.current.forEach((el, i) => apply(el, current.current[i] ?? REST));
  }, []);

  useIsoLayoutEffect(() => {
    current.current = chars.map(() => (intro ? MIN : REST));
    target.current = chars.map(() => REST);
    tint.current = chars.map(() => 0);
    tintTarget.current = chars.map(() => 0);
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fit, intro, text]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const listen = interactive && fine;
    const start = performance.now();
    const introLength = 300 + chars.length * 70;

    // Pętla wyłącznie zapisuje style, nigdy nie czyta układu strony.
    const tick = (now: number) => {
      const els = letters.current;
      const introDone = !intro || now - start > introLength;
      const px = pointer.current;

      if (px !== null && introDone) {
        const sigma = window.innerWidth * 0.12;
        centers.current.forEach((c, i) => {
          const d = c - px;
          const g = Math.exp(-(d * d) / (2 * sigma * sigma));
          target.current[i] = 80 + (MAX - 80) * g;
          tintTarget.current[i] = g;
        });
      } else {
        els.forEach((_, i) => {
          const delay = 250 + i * 70;
          target.current[i] = intro && now - start < delay ? MIN : REST;
          tintTarget.current[i] = 0;
        });
      }

      let moving = false;
      els.forEach((el, i) => {
        const c = current.current[i];
        const t = target.current[i];
        const next = Math.abs(t - c) < 0.3 ? t : c + (t - c) * 0.14;
        if (next !== t) moving = true;
        if (next !== c) apply(el, next);
        current.current[i] = next;

        // Fioletowy odcień liter najbliżej kursora
        const tc = tint.current[i];
        const tt = tintTarget.current[i];
        const tn = Math.abs(tt - tc) < 0.01 ? tt : tc + (tt - tc) * 0.12;
        if (tn !== tt) moving = true;
        if (tn !== tc) {
          el.style.color =
            tn > 0.01
              ? `color-mix(in oklab, var(--color-violet) ${(tn * 85).toFixed(1)}%, currentColor)`
              : "";
        }
        tint.current[i] = tn;
      });

      raf.current = (moving || !introDone) && inView.current ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!raf.current && inView.current) raf.current = requestAnimationFrame(tick);
    };

    // Pozycję kursora względem napisu liczymy tylko przy ruchu myszy.
    // Samo przewijanie strony nie uruchamia animacji (stąd brak zacięć).
    const onMove = (e: PointerEvent) => {
      if (!inView.current || !wrapRef.current) return;
      const wr = wrapRef.current.getBoundingClientRect();
      const margin = Math.max(120, wr.height * 0.8);
      const near = e.clientY > wr.top - margin && e.clientY < wr.bottom + margin;
      const next = near ? e.clientX - wr.left : null;
      if (next === null && pointer.current === null) return;
      pointer.current = next;
      wake();
    };
    const onLeave = () => {
      if (pointer.current === null) return;
      pointer.current = null;
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (!inView.current) pointer.current = null;
    });
    if (wrapRef.current) io.observe(wrapRef.current);

    if (listen) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive, intro, text]);

  return (
    <div ref={wrapRef} className={`w-full overflow-hidden [contain:layout_paint] ${className}`}>
      <span
        ref={lineRef}
        className="inline-block whitespace-nowrap leading-[0.82] tracking-[-0.04em] align-top"
        style={{ fontSize: "15.5vw" }}
        aria-hidden
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) letters.current[i] = el;
            }}
            className="inline-block"
            style={{
              fontStretch: `${intro ? MIN : REST}%`,
              fontWeight: weightFor(intro ? MIN : REST),
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </div>
  );
}
