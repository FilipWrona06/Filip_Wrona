"use client";

import { useEffect, useRef } from "react";

/**
 * Lekki obserwator widoczności: gdy element pojawi się na ekranie, dostaje
 * atrybut data-revealed, a całą animację robi już CSS. Zastępuje biblioteczne
 * „whileInView” tam, gdzie wystarczy prosty efekt wejścia (mniej pracy na starcie strony).
 */
export function useReveal<T extends HTMLElement | SVGElement>(margin = "0px 0px -10% 0px", disabled = false) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "");
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, disabled]);
  return ref;
}
