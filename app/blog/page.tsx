import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/lib/posts";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog o stronach internetowych dla firm",
  description:
    "Poradniki dla firm o stronach internetowych, kosztach, Google i obecności w sieci. Konkretnie i bez żargonu.",
  openGraph: { url: "/blog" },
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Blog", path: "/blog" }])} />
      <PageHeader
        title="Blog"
        lead="Poradniki dla firm o stronach internetowych, Google i obecności w sieci. Konkretnie i bez żargonu."
      />
      <section className="container-site pb-24 md:pb-40" aria-label="Wpisy">
        <ul className="border-t border-ink">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-ink">
              <Link
                href={`/blog/${post.slug}`}
                data-cursor="Czytaj"
                className="group grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-14"
              >
                <div className="text-[15px] text-stone md:col-span-3">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="block">{post.readingMinutes} min czytania</span>
                </div>
                <div className="md:col-span-8">
                  <h2 className="type-heading text-3xl transition-[transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-violet md:text-[2.75rem]">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-[60ch] text-lg text-stone">{post.excerpt}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tematy">
                    {post.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] text-stone">
          Wolisz czytnik RSS?{" "}
          <a href="/blog/rss.xml" className="link-draw text-ink">
            Subskrybuj kanał
          </a>
          .
        </p>
      </section>
      <FinalCta />
    </>
  );
}
