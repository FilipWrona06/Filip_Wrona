import { benefits, stats } from "@/lib/content";
import { Counter } from "@/components/motion/Counter";
import { TextReveal } from "@/components/motion/TextReveal";

export function WhyMe() {
  return (
    <section className="bg-mist" aria-labelledby="dlaczego">
      <div className="container-site section-y">
        <TextReveal
          text="Jedna osoba, pełna odpowiedzialność"
          className="type-display max-w-[13ch] text-[clamp(2.25rem,7vw,6.5rem)]"
        />

        <dl className="mt-16 grid gap-10 border-t border-ink pt-10 md:mt-24 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="type-display block text-[clamp(4rem,9vw,8rem)]">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-3 block max-w-[24ch] text-stone">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-x-10 gap-y-12 md:mt-28 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title}>
              <h3 className="type-heading text-2xl">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
