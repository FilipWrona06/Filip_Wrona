"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { animate, motion } from "motion/react";

type Phase = "hidden" | "flying" | "perched" | "leaving" | "gone";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Sylwetka siedzącej wrony (z profilu, dziób w prawo). Stopy w dolnym środku.
function PerchedCrow() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full overflow-visible" aria-hidden>
      <path
        fill="currentColor"
        d="M38.5 13.2 L31.6 10.4 C30.2 6.1 25.3 5.6 23 9.2 C18.6 11.2 13.6 15.4 9.6 21.4 L1.6 31.2 L8.6 30.2 C12.4 30.8 17.4 30.6 21.2 28.9 C26.2 27.3 30.4 23.4 31.8 18.6 C32.8 15.9 34.6 14.2 38.5 13.6 Z"
      />
      <circle cx="28.4" cy="11.4" r="0.9" fill="var(--color-paper)" />
      <path
        d="M19.6 28.6 L19.2 39.4 M23.6 28 L24.4 39.4 M17.6 39.6 L21.4 39.6 M22.6 39.6 L26.4 39.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Sylwetka wrony w locie, machająca skrzydłami.
function FlyingCrow() {
  return (
    <svg viewBox="0 0 40 24" className="h-full w-full overflow-visible" aria-hidden>
      <path
        className="crow-fly"
        d="M2 6 C9 5 15 9 20 17 C25 9 31 5 38 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Feather() {
  return (
    <svg viewBox="0 0 12 40" className="h-full w-full" aria-hidden>
      <path
        fill="currentColor"
        opacity="0.85"
        d="M6 2 C10 8 11 18 9.2 29 C8.4 33 7.2 36.5 6 39.5 C5 35.5 3.4 31.5 2.8 25.5 C1.8 16 3 7.5 6 2 Z"
      />
      <path d="M6 4 L6 39.5" stroke="var(--color-paper)" strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}

/**
 * Wabi-sabi na podstronach: kilka wron przelatuje przez nagłówek, jedna
 * przysiada na pierwszej literze tytułu, po chwili odlatuje i zostawia
 * pióro, które powoli opada. Nic nie zostaje na zawsze.
 */
export function HeaderCrows({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const crowRef = useRef<HTMLDivElement>(null);
  const featherRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("hidden");
  const [size, setSize] = useState(40);
  const [width, setWidth] = useState(0);
  const perch = useRef({ x: 0, y: 0, s: 40 });
  const phaseRef = useRef<Phase>("hidden");
  phaseRef.current = phase;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    const measure = () => {
      const word = container.querySelector<HTMLElement>("[data-word]");
      if (!word) return null;
      const fs = parseFloat(getComputedStyle(word).fontSize) || 80;
      const cr = container.getBoundingClientRect();
      const r = word.getBoundingClientRect();
      const s = Math.max(24, Math.min(72, fs * 0.42));
      // stopy wrony na górnej krawędzi pierwszej (wielkiej) litery
      perch.current = {
        x: r.left - cr.left + fs * 0.3 - s / 2,
        y: r.top - cr.top + fs * 0.085 - s,
        s,
      };
      setSize(s);
      setWidth(cr.width);
      return perch.current;
    };

    const onResize = () => {
      if (!crowRef.current) return;
      const p = measure();
      if (p && phaseRef.current === "perched") {
        crowRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      }
    };
    window.addEventListener("resize", onResize);

    const run = async () => {
      await wait(1250);
      if (cancelled) return;
      const p = measure();
      const el = crowRef.current;
      if (!p || !el) return;

      setPhase("flying");
      await animate(
        el,
        {
          x: [-160, p.x - p.s * 3.2, p.x - p.s * 0.8, p.x],
          y: [p.y - 240, p.y - p.s * 2.2, p.y - p.s * 0.9, p.y],
        },
        { duration: 2.6, ease: [0.22, 0.7, 0.3, 1], times: [0, 0.55, 0.85, 1] },
      );
      if (cancelled) return;
      setPhase("perched");

      await wait(7000 + Math.random() * 3000);
      if (cancelled) return;
      setPhase("leaving");

      const f = featherRef.current;
      if (f) {
        const fx = p.x + p.s * 0.35;
        const fy = p.y + p.s * 0.45;
        animate(
          f,
          {
            x: [fx, fx + 22, fx - 8, fx + 26, fx + 6],
            y: [fy, fy + 70, fy + 140, fy + 210, fy + 270],
            rotate: [-25, 28, -18, 24, -6],
            opacity: [0, 1, 1, 0.9, 0],
          },
          { duration: 7.5, ease: "easeOut" },
        );
      }

      await animate(
        el,
        { x: [p.x, p.x + 120, p.x + 520], y: [p.y, p.y - 90, p.y - 420] },
        { duration: 2.2, ease: [0.45, 0, 0.8, 0.6] },
      );
      if (!cancelled) setPhase("gone");
    };
    run();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, [containerRef]);

  const perched = phase === "perched";
  const flyingShape = phase === "flying" || phase === "leaving";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 text-ink">
      {/* Przelatujące wrony w tle */}
      {width > 0 &&
        [
          { top: "16%", size: 34, delay: 0.2, duration: 7.5 },
          { top: "28%", size: 26, delay: 0.9, duration: 9 },
          { top: "10%", size: 20, delay: 1.6, duration: 10.5 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute left-0"
            style={{ top: b.top, width: b.size, height: b.size * 0.6 }}
            initial={{ x: -60, y: 0, opacity: 0 }}
            animate={{
              x: [-60, width * 0.5, width + 60],
              y: [0, -18 - i * 6, 8],
              opacity: [0, 0.75, 0],
            }}
            transition={{ duration: b.duration, delay: b.delay, ease: "linear" }}
          >
            <FlyingCrow />
          </motion.div>
        ))}

      <div
        ref={crowRef}
        className="absolute top-0 left-0"
        style={{
          width: size,
          height: size,
          opacity: phase === "hidden" || phase === "gone" ? 0 : 1,
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: perched ? 1 : 0, scale: perched ? 1 : 0.85 }}
          transition={{ duration: 0.25 }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <PerchedCrow />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 top-[20%] h-[60%]"
          initial={false}
          animate={{ opacity: flyingShape ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FlyingCrow />
        </motion.div>
      </div>

      <div
        ref={featherRef}
        className="absolute top-0 left-0 opacity-0"
        style={{ width: size * 0.22, height: size * 0.72 }}
      >
        <Feather />
      </div>
    </div>
  );
}
