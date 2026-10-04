import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Lista wpisów na blogu. Każdy wpis to osobna podstrona w folderze
 * app/blog/<slug>/page.tsx z własnym, dowolnym układem. Tutaj trzymamy
 * tylko dane wspólne: na ich podstawie budują się lista na /blog,
 * mapa strony, kanał RSS, dane dla Google i „podobne wpisy”.
 *
 * Nowy wpis:
 * 1. dodaj obiekt poniżej (najnowsze na górze),
 * 2. utwórz folder app/blog/<slug>/ z plikiem page.tsx (skopiuj istniejący jako punkt wyjścia),
 * 3. skopiuj plik opengraph-image.tsx z innego wpisu (generuje obrazek do udostępniania).
 */
export type Post = {
  slug: string;
  title: string;
  /** krótka nazwa do kurtyny przejścia i okruszków */
  shortTitle: string;
  excerpt: string;
  date: string; // RRRR-MM-DD
  updated?: string;
  readingMinutes: number;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "jak-zalozyc-profil-firmy-w-google",
    title: "Jak założyć Profil Firmy w Google krok po kroku",
    shortTitle: "Profil w Google",
    excerpt:
      "Darmowa wizytówka w Google to dla lokalnej firmy często najważniejsze źródło klientów. Pokazuję, jak ją założyć i uzupełnić, żeby pojawiać się w mapach.",
    date: "2026-10-04",
    readingMinutes: 7,
    tags: ["Google", "Poradnik"],
  },
  {
    slug: "ile-kosztuje-strona-internetowa",
    title: "Ile kosztuje strona internetowa dla firmy w 2026 roku?",
    shortTitle: "Ile kosztuje strona",
    excerpt:
      "Od zera do kilkudziesięciu tysięcy złotych. Wyjaśniam, skąd biorą się takie różnice, ile kosztuje utrzymanie strony i za co naprawdę warto zapłacić.",
    date: "2026-10-04",
    readingMinutes: 8,
    tags: ["Koszty", "Strony internetowe"],
  },
];

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Brak wpisu „${slug}” w lib/posts.ts`);
  return post;
}

export function relatedPosts(slug: string, count = 2) {
  const current = getPost(slug);
  return posts
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        b.tags.filter((t) => current.tags.includes(t)).length -
        a.tags.filter((t) => current.tags.includes(t)).length,
    )
    .slice(0, count);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date),
  );
}

/** Metadane strony wpisu: tytuł, opis, adres kanoniczny i dane do udostępniania. */
export function postMetadata(slug: string): Metadata {
  const post = getPost(slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
    },
  };
}
