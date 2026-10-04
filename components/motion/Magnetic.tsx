"use client";

import { useRef } from "react";

/**
 * Element lekko „przyciąga się” do kursora. Tylko dla myszki (na dotyku nic nie robi).
 * Bez biblioteki: przesunięcie ustawiamy bezpośrednio w stylu, a płynność daje
 * przejście CSS (.magnetic), więc nawet kilkanaście przycisków nie obciąża strony.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (e.pointerType !== "mouse" || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`magnetic inline-block ${className}`}>
      {children}
    </div>
  );
}
