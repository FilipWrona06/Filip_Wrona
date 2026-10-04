import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

// Mapa strony dla Google. Daty są stałe (z lib/site.ts i lib/posts.ts),
// bo data zmieniająca się przy każdym budowaniu jest przez Google ignorowana.
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(site.updated);
  const page = (path: string, priority: number, changeFrequency: "monthly" | "weekly" | "yearly") => ({
    url: `${site.url}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "monthly"),
    page("/oferta", 0.9, "monthly"),
    page("/realizacje", 0.9, "monthly"),
    page("/kontakt", 0.8, "yearly"),
    page("/o-mnie", 0.7, "yearly"),
    page("/blog", 0.7, "weekly"),
    ...projects.map((p) => ({
      url: `${site.url}/realizacje/${p.slug}`,
      lastModified: updated,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      ...(p.cover ? { images: [p.cover.startsWith("http") ? p.cover : `${site.url}${p.cover}`] } : {}),
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
