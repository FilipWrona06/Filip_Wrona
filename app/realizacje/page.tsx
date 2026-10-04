import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Realizacje: strony internetowe dla firm i organizacji",
  description:
    "Portfolio stron internetowych zaprojektowanych i zakodowanych od zera: strona kancelarii oddłużeniowej z Chorzowa i rozbudowana strona Fundacji Maxime. Zobacz, jak powstały.",
  alternates: { canonical: "/realizacje" },
  openGraph: { url: "/realizacje" },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Realizacje", path: "/realizacje" }])} />
      <PageHeader
        title="Realizacje"
        lead="Każdy projekt opisuję tak, jak go prowadziłem: problem, rozwiązanie i efekt w liczbach."
      />
      <section className="container-site pb-24 md:pb-40">
        <div className="space-y-24 md:space-y-36">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} priority={i === 0} headingLevel="h2" />
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
