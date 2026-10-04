"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { process } from "@/lib/content";
import { TextReveal } from "@/components/motion/TextReveal";

// Proces to prawdziwa sekwencja, więc kroki są numerowane.
// Pionowa linia „rysuje się” w miarę przewijania sekcji.
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-ink text-paper" aria-labelledby="proces">
      <div className="container-site section-y grid gap-16 md:grid-cols-12">
        <div className="md:sticky md:top-32 md:col-span-5 md:self-start">
          <TextReveal
            text="Jak pracuję"
            className="type-display text-[clamp(2.25rem,7vw,6.5rem)]"
          />
          <p className="mt-6 max-w-[34ch] text-lg text-smoke">
            Cztery etapy, jasne terminy i żadnych niespodzianek na fakturze.
          </p>
        </div>

        <div ref={ref} className="relative md:col-span-6 md:col-start-7">
          <div className="absolute top-0 bottom-0 left-[1.05rem] w-px bg-white/15" aria-hidden />
          <motion.div
            className="absolute top-0 bottom-0 left-[1.05rem] w-px origin-top bg-violet"
            style={{ scaleY }}
            aria-hidden
          />
          <ol className="space-y-20 md:space-y-28">
            {process.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative pl-16"
                initial={{ opacity: 0.25 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="absolute top-0 left-0 z-10 flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-full border border-paper bg-ink text-sm font-semibold"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="type-heading text-3xl md:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-smoke">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
