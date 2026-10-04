import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

export function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  priority,
}: {
  project: Project;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/realizacje/${project.slug}`}
      className="group block"
      data-cursor="Zobacz projekt"
    >
      <ImageReveal className={`relative w-full ${aspect}`}>
        <div className={`relative h-full w-full ${aspect}`}>
          <ProjectVisual project={project} priority={priority} />
        </div>
      </ImageReveal>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="type-heading text-2xl md:text-3xl">{project.client}</h3>
        <span className="shrink-0 text-sm text-stone">{project.year}</span>
      </div>
      <p className="mt-2 max-w-[52ch] text-stone">{project.summary}</p>
    </Link>
  );
}
