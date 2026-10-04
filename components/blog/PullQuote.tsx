"use client";

import { useReveal } from "@/components/motion/useReveal";

// Wyróżniony cytat, wysuwający się przy przewijaniu (animacja w CSS: .reveal-up).
export function PullQuote({ children }: { children: string }) {
  const ref = useReveal<HTMLQuoteElement>("0px 0px -15% 0px");
  return (
    <blockquote
      ref={ref}
      className="reveal-up not-prose type-heading my-16 border-l-0 text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.05] md:-mr-24"
    >
      <span className="text-violet">„</span>
      {children}
      <span className="text-violet">”</span>
    </blockquote>
  );
}
