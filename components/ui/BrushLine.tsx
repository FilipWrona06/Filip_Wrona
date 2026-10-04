"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { seeded } from "@/lib/random";

// Nieregularna linia jak pociągnięcie pędzlem: grubsza na początku,
// cieńsza i „sucha” na końcu, o lekko poszarpanych brzegach.
// Maluje się od lewej, gdy pojawi się na ekranie.
function brushPath(seed: number) {
  const rnd = seeded(seed);
  const N = 60;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = t * 1000;
    // grubość: szybkie narastanie, długi zanik
    const w = (t < 0.04 ? t / 0.04 : 1) * (1 - Math.pow(t, 2.2) * 0.75) * 5.2;
    const wobble = Math.sin(t * 9 + seed) * 0.5;
    const yt = 6 - w / 2 + wobble + (rnd() - 0.5) * 0.9 * (0.4 + t);
    const yb = 6 + w / 2 + wobble + (rnd() - 0.5) * 0.9 * (0.4 + t);
    top.push(`${x.toFixed(1)},${yt.toFixed(2)}`);
    bottom.unshift(`${x.toFixed(1)},${yb.toFixed(2)}`);
  }
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
}

export function BrushLine({
  seed = 3,
  className = "",
  delay = 0,
  immediate = false,
}: {
  seed?: number;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const d = useMemo(() => brushPath(seed), [seed]);
  const reveal = { clipPath: "inset(0 0% 0 0)" };
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1000 12"
      preserveAspectRatio="none"
      className={`block h-[7px] w-full text-ink ${className}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      {...(immediate
        ? { animate: reveal }
        : { whileInView: reveal, viewport: { once: true, margin: "-5% 0px" } })}
      transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      <path d={d} fill="currentColor" />
    </motion.svg>
  );
}
