import Link from "next/link";
import { packages } from "@/lib/offer";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Oferta jako lista wierszy, nie karty. Po najechaniu wiersz odwraca kolory.
export function OfferList({
  withHeading = true,
  moreLink = false,
}: {
  withHeading?: boolean;
  /** przycisk „Pełna oferta” pod listą (na stronie głównej) */
  moreLink?: boolean;
}) {
  return (
    <section className="container-site section-y" aria-label="Oferta">
      {withHeading && (
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <TextReveal
            text="Co mogę dla Ciebie zrobić"
            className="type-display max-w-[11ch] text-[clamp(2.25rem,7vw,6.5rem)]"
          />
          <p className="max-w-[36ch] text-lg text-stone">
            Trzy punkty wyjścia. Każdy projekt i tak dopasowuję do Twojej firmy.
          </p>
        </div>
      )}

      <ul className="border-t border-ink">
        {packages.map((p) => (
          <li key={p.name} className="border-b border-ink">
            <Link
              href="/kontakt"
              data-cursor="Zapytaj o wycenę"
              className="group relative grid gap-4 overflow-hidden py-10 md:grid-cols-12 md:items-baseline md:gap-8 md:py-12"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <span className="relative transition-colors duration-500 group-hover:text-paper md:col-span-4 md:pl-2 md:transition-[padding,color] md:group-hover:pl-6">
                <span className="type-heading block text-3xl md:text-4xl">{p.name}</span>
                <span className="mt-2 block text-stone group-hover:text-smoke">{p.for}</span>
              </span>
              <ul className="relative space-y-1.5 text-[15px] transition-colors duration-500 group-hover:text-paper md:col-span-5">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <span className="relative transition-colors duration-500 group-hover:text-paper md:col-span-3 md:pr-2 md:text-right">
                <span className="type-heading block text-2xl md:text-3xl">{p.price}</span>
                <span className="mt-1 block text-sm text-stone group-hover:text-smoke">
                  Czas realizacji: {p.time}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {moreLink && (
        <div className="mt-12 md:mt-16">
          <ButtonLink href="/oferta" variant="outline">
            Pełna oferta i dodatki
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
