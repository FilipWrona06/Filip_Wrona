import Link from "next/link";
import { relatedPosts, formatDate } from "@/lib/posts";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Seal } from "@/components/ui/Seal";
import { BrushLine } from "@/components/ui/BrushLine";

// Zakończenie wpisu: podpis z pieczęcią, zaproszenie do kontaktu i podobne wpisy.
export function PostEnd({ slug, cta }: { slug: string; cta?: string }) {
  const related = relatedPosts(slug);
  return (
    <>
      <section className="container-site pb-20 md:pb-28">
        <BrushLine seed={slug.length + 4} className="max-w-xl" />
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="flex items-center gap-5 md:col-span-6">
            <Seal id={`post-${slug}`} className="h-14 w-14 shrink-0 -rotate-2 text-violet" />
            <p className="max-w-[40ch] text-lg text-stone">
              Piszę o stronach internetowych i obecności firm w sieci, bez żargonu. Masz pytanie do
              tego wpisu? Odpowiem.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <ButtonLink href="/kontakt" size="lg">
              {cta ?? "Bezpłatna wycena"}
            </ButtonLink>
            <ButtonLink href="/blog" size="lg" variant="outline">
              Więcej wpisów
            </ButtonLink>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line" aria-labelledby="podobne">
          <div className="container-site py-20 md:py-28">
            <h2 id="podobne" className="type-heading text-3xl md:text-4xl">
              Przeczytaj też
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block" data-cursor="Czytaj">
                    <span className="text-sm text-stone">
                      {formatDate(p.date)} · {p.readingMinutes} min
                    </span>
                    <span className="type-heading mt-3 block text-2xl transition-[transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-violet md:text-3xl">
                      {p.title}
                    </span>
                    <span className="mt-3 block max-w-[52ch] text-stone">{p.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
