"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CrowFlock } from "@/components/motion/CrowFlock";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrushLine } from "@/components/ui/BrushLine";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-14"
    >
      <CrowFlock text="Filip Wrona" containerRef={sectionRef} boxRef={boxRef} progress={scrollYProgress} />

      <div className="container-site relative z-10">
        <motion.div style={{ opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease }}
            className="mb-10 grid gap-8 md:mb-14 md:grid-cols-12 md:items-end"
          >
            <p className="type-lead text-2xl md:col-span-7 md:text-[2.1rem] lg:col-span-6">
              Projektuję i koduję strony internetowe, które ładują się błyskawicznie i zamieniają
              odwiedzających w klientów.
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end lg:col-span-6">
              <ButtonLink href="/kontakt" size="lg">
                Bezpłatna wycena
              </ButtonLink>
              <ButtonLink href="/realizacje" size="lg" variant="outline">
                Zobacz realizacje
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>

        <h1>
          <span className="sr-only">Filip Wrona, strony internetowe dla firm</span>
          {/* Miejsce na napis układany przez stado wron */}
          <span ref={boxRef} aria-hidden className="block aspect-[100/56] w-full sm:aspect-[100/16]" />
        </h1>

        <motion.div style={{ opacity: fade }}>
          <BrushLine seed={3} immediate delay={1.2} className="mt-8 md:mt-10" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-4 flex justify-between gap-6 text-sm text-stone"
          >
            <span>
              <span className="hidden md:inline">Najedź kursorem albo kliknij, żeby spłoszyć wrony</span>
              <span className="md:hidden">Dotknij, żeby spłoszyć wrony</span>
            </span>
            <span className="flex shrink-0 items-center gap-2.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="pulse-ring absolute inset-0 rounded-full bg-violet" />
                <span className="relative h-2 w-2 rounded-full bg-violet" />
              </span>
              Przyjmuję nowe projekty
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
