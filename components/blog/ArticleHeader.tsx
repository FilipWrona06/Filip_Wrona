"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { TextReveal } from "@/components/motion/TextReveal";
import { HeaderCrows } from "@/components/motion/HeaderCrows";
import { BrushLine } from "@/components/ui/BrushLine";

// Nagłówek wpisu: wrona przysiadająca na tytule, dane wpisu i linia pędzla.
// `wide` rozciąga tytuł na szerszą kolumnę (dla wpisów o układzie pełnoszerokościowym).
export function ArticleHeader({ post, wide = false }: { post: Post; wide?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <header ref={ref} className="relative container-site pt-36 pb-12 md:pt-48 md:pb-16">
      <HeaderCrows containerRef={ref} />
      <nav aria-label="Okruszki" className="mb-8 text-[15px] text-stone">
        <Link href="/blog" className="link-draw">
          Blog
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span>{post.tags[0]}</span>
      </nav>
      <TextReveal
        as="h1"
        text={post.title}
        immediate
        className={`type-heading text-[clamp(2.25rem,6vw,5.75rem)] leading-[0.98] ${
          wide ? "max-w-[22ch]" : "max-w-[18ch]"
        }`}
      />
      <p className="type-lead mt-8 max-w-[52ch] text-xl text-stone md:text-2xl">{post.excerpt}</p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-stone">
        <span>{formatDate(post.date)}</span>
        <span>{post.readingMinutes} min czytania</span>
        <span>Filip Wrona</span>
      </div>
      <BrushLine seed={post.slug.length} immediate delay={0.6} className="mt-10 max-w-xl" />
    </header>
  );
}
