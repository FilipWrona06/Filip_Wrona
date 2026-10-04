import { benefits } from "@/lib/content";
import { TextReveal } from "@/components/motion/TextReveal";

export function WhyMe() {
  return (
    <section className="bg-mist" aria-label="Dlaczego ja">
      <div className="container-site section-y">
        <TextReveal
          text="Jedna osoba, pełna odpowiedzialność"
          className="type-display max-w-[16ch] text-[clamp(2.25rem,6vw,5.5rem)]"
        />
        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {benefits.map((b) => (
            <div key={b.title} className="border-t border-ink pt-5">
              <h3 className="type-heading text-2xl">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
