import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { Seal } from "@/components/ui/Seal";

export const metadata: Metadata = {
  title: "O mnie",
  description:
    "Jestem Filip Wrona. Projektuję i koduję strony internetowe dla firm i sam prowadzę każdy projekt od początku do końca.",
  alternates: { canonical: "/o-mnie" },
};

// TODO: przepisz te teksty własnymi słowami. Konkretne historie budują zaufanie najlepiej.
const principles = [
  {
    title: "Najpierw cel, potem wygląd",
    text: "Zanim cokolwiek zaprojektuję, ustalamy, co strona ma robić: przynosić telefony, rezerwacje, zapytania. Każda decyzja projektowa wynika z tego celu.",
  },
  {
    title: "Szybkość to nie dodatek",
    text: "Ludzie zamykają strony, które wolno się ładują. Dlatego piszę kod od zera w Next.js, zamiast składać stronę z ciężkich wtyczek.",
  },
  {
    title: "Mówię po ludzku",
    text: "Nie musisz znać się na technologii. Tłumaczę wszystko prosto, a decyzje techniczne biorę na siebie.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Cześć, jestem Filip"
        lead="Projektuję i koduję strony internetowe dla firm. Pracuję sam, więc każdy projekt prowadzę osobiście, od pierwszej rozmowy po wsparcie po starcie."
      />

      <section className="container-site grid gap-12 pb-24 md:grid-cols-12 md:pb-40">
        <div className="md:col-span-5">
          <ImageReveal className="relative aspect-[4/5] w-full">
            <PortraitPlaceholder priority />
          </ImageReveal>
        </div>
        <div className="space-y-6 text-lg leading-relaxed md:col-span-6 md:col-start-7 md:pt-16">
          <p className="type-lead text-2xl">
            Strony internetowe zacząłem robić, bo widziałem, ile lokalnych firm traci klientów przez
            przestarzałe albo nieistniejące strony.
          </p>
          <p className="text-stone">
            Dziś pomagam firmom usługowym wyglądać w sieci tak profesjonalnie, jak pracują na co
            dzień. Zajmuję się projektem graficznym, kodem, domeną, wizytówką Google i wszystkim, co
            jest potrzebne, żeby strona przynosiła zapytania.
          </p>
          <p className="text-stone">
            Pracuję zdalnie z klientami z całej Polski. Większość spraw załatwiamy przez telefon,
            wideorozmowę i e-mail.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Seal id="about" className="h-14 w-14 rotate-2 text-violet" />
            <span className="text-[15px] text-stone">Filip Wrona</span>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-site section-y">
          <h2 className="type-display max-w-[12ch] text-[clamp(2.25rem,6vw,5.5rem)]">
            Jak podchodzę do pracy
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-ink pt-6">
                <h3 className="type-heading text-2xl">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-stone">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FinalCta />
    </>
  );
}
