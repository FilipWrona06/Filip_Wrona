"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { seeded } from "@/lib/random";

// Ensō: zenowy okrąg malowany jednym ruchem pędzla, celowo niedomknięty.
function ensoPath(seed: number, rOffset = 0, sweep = 330) {
  const rnd = seeded(seed);
  const start = -100;
  const pts: string[] = [];
  const steps = 90;
  for (let i = 0; i <= steps; i++) {
    const a = ((start + (sweep * i) / steps) * Math.PI) / 180;
    const r =
      40 + rOffset + Math.sin(a * 3 + seed) * 1.4 + Math.sin(a * 7 + 1) * 0.6 + (rnd() - 0.5) * 0.5;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
}

export function Enso({ className = "", duration = 0.9 }: { className?: string; duration?: number }) {
  const main = useMemo(() => ensoPath(11), []);
  const dry = useMemo(() => ensoPath(5, 2.6, 290), []);
  const ease = [0.6, 0, 0.3, 1] as const;
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <motion.path
        d={main}
        fill="none"
        stroke="currentColor"
        strokeWidth={6.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease }}
      />
      <motion.path
        d={dry}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.45}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: duration * 0.9, delay: 0.05, ease }}
      />
    </svg>
  );
}
