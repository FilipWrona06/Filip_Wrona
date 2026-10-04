import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

export function ValuesBand() {
  return (
    <section aria-label="Co dostajesz" className="bg-ink py-5 text-paper md:py-7">
      <VelocityMarquee
        className="type-heading text-[clamp(2rem,5vw,4.5rem)]"
        items={[
          "Szybkie ładowanie",
          "Projekt od zera",
          "Widoczność w Google",
          "Bezpośredni kontakt",
          "Wsparcie po starcie",
        ]}
      />
    </section>
  );
}
