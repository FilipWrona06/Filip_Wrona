import Link from "next/link";
import { posts, formatDate } from "@/lib/posts";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Najnowsze wpisy z bloga na stronie głównej.
export function LatestPosts({ count = 2 }: { count?: number }) {
  const latest = posts.slice(0, count);
  if (latest.length === 0) return null;
  return (
    <section className="border-t border-line" aria-label="Z bloga">
      <div className="container-site section-y">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <TextReveal text="Z bloga" className="type-display text-[clamp(2.25rem,7vw,6.5rem)]" />
          <p className="max-w-[36ch] text-lg text-stone">
            Poradniki dla firm o stronach, Google i obecności w sieci. Bez żargonu.
          </p>
        </div>
        <ul className="grid gap-12 md:grid-cols-2 md:gap-10">
          {latest.map((p) => (
            <li key={p.slug} className="border-t border-ink pt-6">
              <Link href={`/blog/${p.slug}`} className="group block" data-cursor="Czytaj">
                <span className="text-sm text-stone">
                  {formatDate(p.date)} · {p.readingMinutes} min czytania
                </span>
                <span className="type-heading mt-4 block text-3xl transition-[transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-violet md:text-4xl">
                  {p.title}
                </span>
                <span className="mt-4 block max-w-[52ch] text-stone">{p.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <ButtonLink href="/blog" variant="outline">
            Wszystkie wpisy
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
