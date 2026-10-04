import { projects } from "@/lib/projects";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Realizacje na stronie głównej: najnowsze projekty jako szerokie wiersze.
export function FeaturedWork() {
  return (
    <section className="container-site section-y" aria-labelledby="realizacje-tytul">
      <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
        <TextReveal
          text="Wybrane realizacje"
          className="type-display max-w-[10ch] text-[clamp(2.25rem,7vw,6.5rem)]"
        />
        <p className="max-w-[36ch] text-lg text-stone">
          Każdy projekt zaczynam od pytania, co strona ma zrobić dla biznesu. Wygląd przychodzi
          zaraz potem.
        </p>
      </div>

      <div className="space-y-24 md:space-y-36">
        {projects.slice(0, 3).map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="mt-20 md:mt-28">
        <ButtonLink href="/realizacje" variant="outline">
          Wszystkie realizacje
        </ButtonLink>
      </div>
    </section>
  );
}
