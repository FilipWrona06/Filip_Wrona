"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Seal } from "@/components/ui/Seal";

// Interaktywna lista kontrolna. Zaznaczenia zapisują się w przeglądarce czytelnika,
// więc może wrócić do wpisu i kontynuować.
export function Checklist({ id, title, items }: { id: string; title: string; items: string[] }) {
  const key = `checklist:${id}`;
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      if (Array.isArray(saved) && saved.length === items.length) setDone(saved);
    } catch {
      /* brak zapisu: zaczynamy od zera */
    }
  }, [key, items.length]);

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = prev.map((v, j) => (j === i ? !v : v));
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* przeglądarka bez zapisu: lista działa bez pamięci */
      }
      return next;
    });
  };

  const count = done.filter(Boolean).length;
  const complete = count === items.length;

  return (
    <section className="bg-ink p-6 text-paper md:p-12" aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id={`${id}-title`} className="type-heading text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-smoke" aria-live="polite">
          {count} z {items.length}
        </p>
      </div>
      <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="h-full origin-left rounded-full bg-violet"
          animate={{ scaleX: count / items.length }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <ul className="mt-8 divide-y divide-white/10">
        {items.map((item, i) => (
          <li key={item}>
            <label className="group flex cursor-pointer items-start gap-4 py-4 text-lg">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => toggle(i)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors peer-checked:border-violet peer-checked:bg-violet peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet group-hover:border-paper"
              >
                <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${done[i] ? "opacity-100" : "opacity-0"}`}>
                  <motion.path
                    d="M3 8.5 L6.5 12 L13 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ pathLength: done[i] ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </svg>
              </span>
              <span className={`transition-colors ${done[i] ? "text-smoke line-through decoration-violet decoration-2" : ""}`}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex items-center gap-4"
          >
            <Seal id={`${id}-done`} className="h-12 w-12 -rotate-3 text-violet" />
            <p className="text-lg">Gotowe. Twój profil jest kompletny i gotowy na klientów.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
