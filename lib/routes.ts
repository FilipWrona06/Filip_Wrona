import { projects } from "@/lib/projects";

// Nazwy podstron wyświetlane w kurtynie przejścia.
export function routeLabel(pathname: string): string {
  if (pathname === "/") return "Filip Wrona";
  if (pathname.startsWith("/realizacje/")) {
    const slug = pathname.split("/")[2];
    return projects.find((p) => p.slug === slug)?.client ?? "Realizacje";
  }
  const map: Record<string, string> = {
    "/realizacje": "Realizacje",
    "/oferta": "Oferta",
    "/o-mnie": "O mnie",
    "/kontakt": "Kontakt",
    "/polityka-prywatnosci": "Prywatność",
  };
  return map[pathname] ?? "Filip Wrona";
}
