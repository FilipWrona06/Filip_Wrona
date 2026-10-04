"use client";

import { useRef } from "react";
import { CrowFlock } from "@/components/motion/CrowFlock";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function NotFoundHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-16"
    >
      <CrowFlock text="404" containerRef={sectionRef} boxRef={boxRef} />
      <div className="container-site relative z-10">
        <span ref={boxRef} aria-hidden className="block aspect-[100/36] w-full max-w-5xl" />
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="type-heading text-3xl md:text-5xl">Wrony porwały tę stronę.</h1>
            <p className="mt-4 max-w-[44ch] text-lg text-stone">
              Adres mógł się zmienić albo zawierać literówkę. Wróć na stronę główną albo zobacz
              realizacje.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Strona główna
            </ButtonLink>
            <ButtonLink href="/realizacje" size="lg" variant="outline">
              Realizacje
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
