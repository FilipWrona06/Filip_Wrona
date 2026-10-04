"use client";

import { useRef } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { HeaderCrows } from "@/components/motion/HeaderCrows";
import { BrushLine } from "@/components/ui/BrushLine";

// Nagłówek podstron: duży tytuł wysuwany słowo po słowie, wrona, która
// przysiada na pierwszej literze, i linia pędzla pod opisem.
export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <header ref={ref} className="relative container-site pt-36 pb-16 md:pt-48 md:pb-24">
      <HeaderCrows containerRef={ref} />
      <TextReveal
        as="h1"
        text={title}
        immediate
        className="type-display max-w-[14ch] text-[clamp(2.5rem,9vw,8.5rem)]"
      />
      {lead && (
        <p className="type-lead mt-8 max-w-[46ch] text-xl text-stone md:text-2xl">{lead}</p>
      )}
      <BrushLine seed={7} immediate delay={0.6} className="mt-12 max-w-xl md:mt-16" />
    </header>
  );
}
