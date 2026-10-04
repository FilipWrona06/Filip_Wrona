import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

/**
 * Realizacja jako szeroki, redakcyjny wiersz: duże zdjęcie w naturalnych,
 * poziomych proporcjach i obok numer, nazwa, opis oraz zakres prac.
 * Co drugi wiersz ma zdjęcie po prawej stronie.
 */
export function ProjectRow({
  project,
  index,
  priority,
  headingLevel = "h3",
}: {
  project: Project;
  index: number;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const flip = index % 2 === 1;
  const Heading = headingLevel;
  return (
    <Link
      href={`/realizacje/${project.slug}`}
      data-cursor="Zobacz projekt"
      className="group grid items-center gap-8 md:grid-cols-12 md:gap-10"
    >
      <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
        <ImageReveal className="relative aspect-[1200/630] w-full overflow-hidden rounded-[4px] bg-mist">
          <div className="relative h-full w-full">
            <ProjectVisual
              project={project}
              priority={priority}
              sizes="(min-width: 1440px) 800px, (min-width: 768px) 58vw, 100vw"
            />
          </div>
        </ImageReveal>
      </div>

      <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <div className="flex items-baseline gap-4 text-[15px] text-stone">
          <span className="font-semibold text-violet">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.industry}</span>
          <span className="ml-auto">{project.year}</span>
        </div>
        <Heading className="type-heading mt-4 text-3xl transition-colors duration-500 group-hover:text-violet md:text-4xl">
          {project.client}
        </Heading>
        <p className="mt-4 text-lg leading-relaxed text-stone">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Zakres prac">
          {project.scope.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-3 text-[15px] font-semibold">
          <span className="relative">
            Zobacz case study
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-violet transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          </span>
        </span>
      </div>
    </Link>
  );
}
