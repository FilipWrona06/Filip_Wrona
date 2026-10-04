"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Pasek, który płynie sam, ale przyspiesza, zwalnia, zmienia kierunek
 * i lekko się pochyla zależnie od tego, jak szybko i w którą stronę
 * użytkownik przewija stronę.
 */
export function VelocityMarquee({
  items,
  baseVelocity = -2.2,
  className = "",
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const skewX = useTransform(smooth, [-2500, 0, 2500], [8, 0, -8]);
  const direction = useRef(1);

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const row = (hidden: boolean, key: number) => (
    <ul key={key} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-[0.45em]">{item}</span>
          <span
            className="inline-block h-[0.16em] w-[0.16em] rounded-full bg-violet"
            aria-hidden
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((k) => row(k > 0, k))}
      </motion.div>
    </div>
  );
}
