"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

// Duży numer kroku, który „rozpręża się” (oś szerokości fontu), gdy pojawi się na ekranie.
export function StepNumber({ n }: { n: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    // izolacja: zmiana szerokości liter nie przelicza układu reszty strony
    <div className="overflow-hidden [contain:layout_paint]">
    <span
      ref={ref}
      aria-hidden
      className="type-display block text-[clamp(4.5rem,11vw,10rem)] leading-[0.8] transition-[font-stretch,color] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        fontStretch: inView ? "125%" : "62%",
        color: inView ? "var(--color-ink)" : "var(--color-line)",
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
    </div>
  );
}
