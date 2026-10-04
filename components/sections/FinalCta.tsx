import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextReveal } from "@/components/motion/TextReveal";

export function FinalCta() {
  return (
    <section className="border-t border-line">
      <div className="container-site section-y">
        <TextReveal
          text="Porozmawiajmy o Twojej stronie"
          className="type-display max-w-[12ch] text-[clamp(2.25rem,10vw,9.5rem)]"
        />
        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[40ch] text-lg text-stone">
            Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje. Po niej dostajesz
            konkretną wycenę i termin.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/kontakt" size="lg">
              Bezpłatna wycena
            </ButtonLink>
            <ButtonLink href={site.booking} size="lg" variant="outline" external>
              Umów rozmowę
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
