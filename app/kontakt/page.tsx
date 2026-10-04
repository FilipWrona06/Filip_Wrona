import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt i bezpłatna wycena",
  description:
    "Opisz swój projekt, a w ciągu jednego dnia roboczego dostaniesz odpowiedź z propozycją wyceny. Możesz też od razu umówić krótką rozmowę.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Bezpłatna wycena"
        lead="Opisz krótko swój projekt. Odpowiem w ciągu jednego dnia roboczego z pytaniami albo od razu z wyceną."
      />
      <section className="container-site grid gap-16 pb-24 md:grid-cols-12 md:pb-40">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="text-[15px] text-stone">Wolisz porozmawiać?</h2>
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw type-heading mt-2 inline-block text-2xl"
            >
              Umów 15-minutową rozmowę
            </a>
          </div>
          <div>
            <h2 className="text-[15px] text-stone">Telefon</h2>
            <a href={site.phoneHref} className="link-draw type-heading mt-2 inline-block text-2xl">
              {site.phone}
            </a>
          </div>
          <div>
            <h2 className="text-[15px] text-stone">E-mail</h2>
            <a
              href={`mailto:${site.email}`}
              className="link-draw type-heading mt-2 inline-block text-2xl break-all"
            >
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="text-[15px] text-stone">WhatsApp</h2>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw type-heading mt-2 inline-block text-2xl"
            >
              Napisz wiadomość
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
