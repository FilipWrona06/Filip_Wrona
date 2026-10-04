"use client";

import { useEffect, useState } from "react";

// Spis treści przyklejony z boku. Podświetla sekcję, którą właśnie czytasz.
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let raf = 0;
    // Aktywna sekcja = ostatni nagłówek, który minął 35% wysokości ekranu.
    // Liczona przy każdym przewinięciu (raz na klatkę), więc działa też przy skokach.
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Spis treści" className="text-[15px]">
      <p className="mb-4 font-semibold">W tym artykule</p>
      <ol className="space-y-1 border-l border-line">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 transition-colors duration-300 ${
                  isActive ? "border-violet text-ink" : "border-transparent text-stone hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
