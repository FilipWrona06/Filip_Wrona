import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

// Nazwy podstron wyświetlane w kurtynie przejścia.
export function routeLabel(pathname: string): string {
  if (pathname === "/") return "Filip Wrona";
  if (pathname.startsWith("/realizacje/")) {
    const slug = pathname.split("/")[2];
    return projects.find((p) => p.slug === slug)?.client ?? "Realizacje";
  }
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.split("/")[2];
    return posts.find((p) => p.slug === slug)?.shortTitle ?? "Blog";
  }
  const map: Record<string, string> = {
    "/blog": "Blog",
    "/realizacje": "Realizacje",
    "/oferta": "Oferta",
    "/o-mnie": "O mnie",
    "/kontakt": "Kontakt",
    "/polityka-prywatnosci": "Prywatność",
  };
  return map[pathname] ?? "Filip Wrona";
}
