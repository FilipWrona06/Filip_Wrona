import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Strony internetowe, które zaprojektowałem i zakodowałem dla firm. Zobacz, jakie problemy rozwiązały i jakie dały efekty.",
  alternates: { canonical: "/realizacje" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Realizacje"
        lead="Każdy projekt opisuję tak, jak go prowadziłem: problem, rozwiązanie i efekt w liczbach."
      />
      <section className="container-site pb-24 md:pb-40">
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "md:mt-40" : ""}>
              <ProjectCard project={p} aspect="aspect-[4/5]" priority={i < 2} />
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
