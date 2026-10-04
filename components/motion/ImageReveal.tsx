"use client";

import { useReveal } from "@/components/motion/useReveal";

// Odsłania zawartość (zdjęcie projektu) od dołu, kiedy wchodzi w widok,
// jednocześnie lekko pomniejszając obraz dla efektu głębi. Animacja w CSS (.reveal-clip).
export function ImageReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal-clip overflow-hidden ${className}`}>
      <div className="reveal-zoom h-full w-full">{children}</div>
    </div>
  );
}
