import { faq } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import { JsonLd } from "@/lib/seo";

export function Faq({ limit, more }: { limit?: number; more?: { href: string; label: string } } = {}) {
  const items = limit ? faq.slice(0, limit) : faq;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="container-site section-y grid gap-12 md:grid-cols-12" aria-labelledby="faq">
      <JsonLd data={jsonLd} />
      <div className="md:col-span-4">
        <TextReveal
          text="Częste pytania"
          className="type-display text-[clamp(2.25rem,6vw,5.5rem)]"
        />
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <Accordion items={items} />
        {more && (
          <Link href={more.href} className="link-draw mt-8 inline-block text-[15px] font-semibold">
            {more.label}
          </Link>
        )}
      </div>
    </section>
  );
}
