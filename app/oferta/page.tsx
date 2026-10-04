import type { Metadata } from "next";
import { care, extras, packages } from "@/lib/offer";
import { JsonLd, breadcrumbs } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { OfferList } from "@/components/sections/OfferList";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Cennik stron internetowych dla firm",
  description: `Ile kosztuje strona internetowa? Strona wizytówka ${packages[0].price}, strona firmowa ${packages[1].price}. Zobacz, co zawiera każdy pakiet, czas realizacji i koszt opieki technicznej.`,
  alternates: { canonical: "/oferta" },
  openGraph: { url: "/oferta" },
};

export default function OfferPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Oferta", path: "/oferta" }])} />
      <PageHeader
        title="Oferta i ceny"
        lead="Tworzenie stron internetowych dla firm: jasne zakresy i ceny początkowe. Ostateczną wycenę dostajesz po krótkiej, bezpłatnej rozmowie."
      />
      <OfferList withHeading={false} />

      <section className="container-site pb-24 md:pb-40">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="type-heading text-3xl md:text-4xl">Dodatki</h2>
            <ul className="mt-8 border-t border-line">
              {extras.map((x) => (
                <li
                  key={x.name}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-4 text-lg"
                >
                  <span>{x.name}</span>
                  <span className="shrink-0 text-stone">{x.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-8 text-paper md:col-span-6 md:col-start-7 md:p-12">
            <h2 className="type-heading text-3xl md:text-4xl">{care.name}</h2>
            <p className="type-heading mt-3 text-2xl text-smoke">{care.price}</p>
            <p className="mt-6 max-w-[44ch] text-smoke">
              Dla tych, którzy wolą, żeby strona po prostu działała, a zmiany robił ktoś inny.
            </p>
            <ul className="mt-8 space-y-3 text-lg">
              {care.includes.map((i) => (
                <li key={i} className="border-t border-white/15 pt-3">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
