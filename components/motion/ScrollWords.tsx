"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, ["0.18em", "0em"]);
  return (
    <motion.span className="inline-block will-change-[opacity,transform]" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

/**
 * Tekst „czytany” przewijaniem: kolejne słowa wychodzą z cienia
 * dokładnie w tempie, w jakim użytkownik scrolluje.
 */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>{" "}
            </span>
          );
        })}
      </span>
    </p>
  );
}
