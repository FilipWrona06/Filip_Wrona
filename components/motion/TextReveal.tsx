"use client";

import { useEffect, useRef, type CSSProperties, type ElementType } from "react";
import { noOrphans } from "@/lib/typography";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** animuj od razu po wczytaniu zamiast przy wejściu w widok */
  immediate?: boolean;
};

/**
 * Nagłówek, którego słowa wysuwają się spod maski, jedno po drugim.
 * Animacja jest w czystym CSS (app/globals.css: .tr-*), a JavaScript tylko raz
 * zaznacza, że nagłówek pojawił się na ekranie. Dzięki temu nawet kilkadziesiąt
 * nagłówków na stronie praktycznie nie obciąża przeglądarki.
 */
export function TextReveal({ text, as: Tag = "h2", className = "", delay = 0, immediate }: Props) {
  const ref = useRef<HTMLElement>(null);
  // jednoliterowe słowa (w, z, i…) łączymy z następnym, żeby nie zostawały na końcu linii
  const words = noOrphans(text).split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || immediate) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      className={`${immediate ? "tr-immediate" : "tr"} ${className}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {words.map((word, i) => (
          <span key={i} className="tr-mask">
            <span data-word className="tr-word" style={{ "--i": i } as CSSProperties}>
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
