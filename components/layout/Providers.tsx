"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";


let lenisInstance: Lenis | null = null;
// true, gdy zmiana adresu pochodzi z przycisku „wstecz/dalej” przeglądarki
let fromHistory = false;

/** Miejsce zostawiane nad nagłówkiem po przewinięciu do sekcji (wysokość menu). */
const ANCHOR_OFFSET = 110;

/** Płynne przewinięcie do elementu o danym id, z miejscem na menu. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
  if (lenisInstance) lenisInstance.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Płynne przewijanie całej strony: mniejszy lerp = miękcej i dłużej wyhamowuje
    lenisInstance = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    // Linki do sekcji na tej samej stronie (spis treści, kotwice przy nagłówkach).
    // Pozycję liczymy sami, bo jest dokładniejsza niż wbudowana obsługa kotwic w Lenis.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!href.startsWith("#") || href === "#" || href === "#tresc") return;
      e.preventDefault();
      scrollToId(decodeURIComponent(href.slice(1)));
    };
    document.addEventListener("click", onClick);
    const onPop = () => {
      fromHistory = true;
    };
    window.addEventListener("popstate", onPop);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  // Nowa podstrona zaczyna się od góry. Przy „wstecz” przeglądarka sama przywraca
  // poprzednie miejsce, więc wtedy tylko synchronizujemy Lenis z aktualną pozycją.
  useEffect(() => {
    if (fromHistory) {
      fromHistory = false;
      lenisInstance?.resize();
      return;
    }
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
