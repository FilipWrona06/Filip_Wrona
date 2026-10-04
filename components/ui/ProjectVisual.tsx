import type { Project } from "@/lib/projects";
import { SafeImage } from "@/components/ui/SafeImage";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Zdjęcie projektu wypełniające cały kontener (bez ramek i pustych pól).
 * Po najechaniu powoli się przybliża (wyłącznie transform, więc płynnie).
 * Bez zdjęcia albo gdy się nie wczyta: typograficzna zaślepka.
 */
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
  const placeholder = (
    <span className="absolute inset-0 flex items-end bg-mist p-6 md:p-10">
      <span
        className="block leading-[0.88] font-extrabold tracking-[-0.03em] [font-stretch:80%] [overflow-wrap:anywhere]"
        style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
      >
        {project.client}
      </span>
    </span>
  );

  if (!image) return placeholder;

  return (
    <SafeImage
      fallback={placeholder}
      src={image}
      alt={`Strona internetowa: ${project.client}`}
      fill
      sizes={sizes}
      preload={priority}
      className={`object-cover object-top transition-transform duration-[1.4s] ${ease} will-change-transform group-hover:scale-[1.035]`}
    />
  );
}
