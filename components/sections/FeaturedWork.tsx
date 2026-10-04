import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FeaturedWork() {
  const [first, second, third] = projects;
  return (
    <section className="container-site section-y" aria-labelledby="realizacje-tytul">
      <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
        <TextReveal
          text="Wybrane realizacje"
          className="type-display max-w-[10ch] text-[clamp(2.25rem,7vw,6.5rem)]"
        />
        <p className="max-w-[36ch] text-lg text-stone">
          Każdy projekt zaczynam od pytania, co strona ma zrobić dla biznesu. Wygląd przychodzi
          zaraz potem.
        </p>
      </div>

      {/* Asymetryczny układ: duży projekt i dwa mniejsze, przesunięte względem siebie */}
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
        {first && (
          <div className="md:col-span-12">
            <ProjectCard project={first} aspect="aspect-[4/3] md:aspect-[21/9]" />
          </div>
        )}
        {second && (
          <div className="md:col-span-6">
            <ProjectCard project={second} aspect="aspect-[4/5]" />
          </div>
        )}
        {third && (
          <div className="md:col-span-5 md:col-start-8 md:mt-40">
            <ProjectCard project={third} aspect="aspect-[4/5]" />
          </div>
        )}
      </div>

      <div className="mt-16 md:mt-24">
        <ButtonLink href="/realizacje" variant="outline">
          Wszystkie realizacje
        </ButtonLink>
      </div>
    </section>
  );
}
