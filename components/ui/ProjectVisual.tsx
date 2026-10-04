import Image from "next/image";
import type { Project } from "@/lib/projects";

// Okładka projektu. Jeśli nie ma jeszcze zrzutu ekranu, pokazuje
// typograficzną zaślepkę w stylu marki, więc strona wygląda dobrze od pierwszego dnia.
export function ProjectVisual({
  project,
  src,
  priority,
  sizes = "(min-width: 768px) 60vw, 100vw",
}: {
  project: Project;
  src?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = src ?? project.cover;
  if (image) {
    return (
      <Image
        src={image}
        alt={`Strona internetowa: ${project.client}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-mist p-6 transition-colors duration-700 group-hover:bg-ink group-hover:text-paper md:p-10">
      <span className="text-sm text-stone">{project.industry}</span>
      <span
        className="block leading-[0.85] font-extrabold tracking-[-0.04em] transition-[font-stretch] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [font-stretch:70%] group-hover:[font-stretch:125%]"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
        aria-hidden
      >
        {project.client}
      </span>
    </div>
  );
}
