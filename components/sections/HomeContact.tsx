import { site } from "@/lib/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { BrushLine } from "@/components/ui/BrushLine";

// Formularz kontaktowy na końcu strony głównej.
export function HomeContact() {
  return (
    <section id="kontakt" className="border-t border-line" aria-label="Kontakt">
      <div className="container-site section-y">
        <TextReveal
          text="Porozmawiajmy o Twojej stronie"
          className="type-display max-w-[14ch] text-[clamp(2.5rem,7vw,6.5rem)]"
        />
      <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-[38ch] text-lg text-stone">
            Opisz krótko swój projekt. Odpowiem w ciągu jednego dnia roboczego z pytaniami albo od
            razu z wyceną. Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje.
          </p>
          <BrushLine seed={21} className="mt-10 max-w-sm" />
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-[15px] text-stone">E-mail</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link-draw type-heading text-2xl break-all">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[15px] text-stone">Telefon</dt>
              <dd>
                <a href={site.phoneHref} className="link-draw type-heading text-2xl">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[15px] text-stone">Wolisz porozmawiać?</dt>
              <dd>
                <a
                  href={site.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw type-heading text-2xl"
                >
                  Umów 15-minutową rozmowę
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </div>
      </div>
    </section>
  );
}
