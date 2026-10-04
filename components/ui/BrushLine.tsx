"use client";

import { useMemo, type CSSProperties } from "react";
import { seeded } from "@/lib/random";
import { useReveal } from "@/components/motion/useReveal";

// Nieregularna linia jak pociągnięcie pędzlem: grubsza na początku,
// cieńsza i „sucha” na końcu, o lekko poszarpanych brzegach.
// Maluje się od lewej (animacja w CSS: .brush), gdy pojawi się na ekranie.
function brushPath(seed: number) {
  const rnd = seeded(seed);
  const N = 60;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = t * 1000;
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
  const ref = useReveal<SVGSVGElement>("0px 0px -5% 0px", immediate);
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 1000 12"
      preserveAspectRatio="none"
      className={`${immediate ? "brush-immediate" : "brush"} block h-[7px] w-full text-ink ${className}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}
