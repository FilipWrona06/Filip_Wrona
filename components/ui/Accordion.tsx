"use client";

import { useId, useState } from "react";

/**
 * Akordeon (FAQ). Wszystkie odpowiedzi są zawsze w kodzie strony (dobre dla SEO),
 * a zwijanie i rozwijanie robi CSS (.acc-panel), bez biblioteki animacji.
 */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-semibold md:text-2xl"
              >
                <span>{item.q}</span>
                <span className="relative h-5 w-5 shrink-0" aria-hidden>
                  <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              data-open={isOpen || undefined}
              className="acc-panel"
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-7 text-lg leading-relaxed text-stone">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
