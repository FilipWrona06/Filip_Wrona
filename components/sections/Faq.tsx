import { faq } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { TextReveal } from "@/components/motion/TextReveal";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="container-site section-y grid gap-12 md:grid-cols-12" aria-labelledby="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="md:col-span-4">
        <TextReveal
          text="Częste pytania"
          className="type-display text-[clamp(2.25rem,6vw,5.5rem)]"
        />
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <Accordion items={faq} />
      </div>
    </section>
  );
}
