import { process } from "@/lib/content";
import { TextReveal } from "@/components/motion/TextReveal";
import { BrushLine } from "@/components/ui/BrushLine";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Skrócona wersja procesu na stronę główną: cztery kroki w jednym rzędzie.
export function ProcessCompact() {
  return (
    <section className="container-site section-y" aria-label="Jak pracuję">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <TextReveal text="Jak pracuję" className="type-display text-[clamp(2.25rem,7vw,6.5rem)]" />
        <p className="max-w-[36ch] text-lg text-stone">
          Cztery etapy, jasne terminy i żadnych niespodzianek na fakturze.
        </p>
      </div>
      <BrushLine seed={12} />
      <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <li key={step.title}>
            <span className="type-heading text-lg text-violet">0{i + 1}</span>
            <h3 className="type-heading mt-3 text-2xl">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-stone">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14">
        <ButtonLink href="/oferta" variant="outline">
          Szczegóły współpracy
        </ButtonLink>
      </div>
    </section>
  );
}
