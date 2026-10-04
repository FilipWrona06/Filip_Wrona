import { testimonials } from "@/lib/content";
import { TextReveal } from "@/components/motion/TextReveal";

export function Testimonials() {
  return (
    <section className="border-t border-line" aria-labelledby="opinie">
      <div className="container-site section-y">
        <TextReveal
          text="Co mówią klienci"
          className="type-display max-w-[10ch] text-[clamp(2.25rem,7vw,6.5rem)]"
        />
        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-10">
          {testimonials.map((t, i) => (
            <figure key={t.author} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-48" : ""}>
              <blockquote className="type-lead text-xl md:text-2xl">„{t.quote}”</blockquote>
              <figcaption className="mt-6 text-[15px]">
                <span className="font-semibold">{t.author}</span>
                <span className="block text-stone">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
