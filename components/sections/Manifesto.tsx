import { ScrollWords } from "@/components/motion/ScrollWords";

export function Manifesto() {
  return (
    <section className="container-site section-y" aria-label="Moje podejście">
      <div className="grid gap-10 md:grid-cols-12">
        <ScrollWords
          className="type-heading text-[clamp(1.9rem,4.4vw,4.4rem)] md:col-span-9 md:col-start-4"
          text="Strona internetowa to często pierwsze spotkanie klienta z Twoją firmą. Projektuję ją tak, żeby to spotkanie było krótkie, przyjemne i kończyło się telefonem."
        />
      </div>
    </section>
  );
}
