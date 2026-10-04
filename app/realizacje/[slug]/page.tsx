import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.client}: strona internetowa`,
    description: project.summary,
    alternates: { canonical: `/realizacje/${project.slug}` },
    openGraph: { title: `${project.client} | Realizacja ${site.name}`, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Strona internetowa: ${project.client}`,
    description: project.summary,
    creator: { "@id": `${site.url}/#person` },
    dateCreated: project.year,
    url: `${site.url}/realizacje/${project.slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="container-site pt-36 md:pt-48">
        <Link href="/realizacje" className="link-draw text-[15px] text-stone">
          Wszystkie realizacje
        </Link>
        <TextReveal
          as="h1"
          text={project.client}
          immediate
          className="type-display mt-6 max-w-[14ch] text-[clamp(2.5rem,9vw,8.5rem)]"
        />
        <p className="type-lead mt-8 max-w-[44ch] text-xl text-stone md:text-2xl">
          {project.summary}
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-ink pt-8 text-[15px] md:grid-cols-4">
          <div>
            <dt className="text-stone">Branża</dt>
            <dd className="mt-1 font-semibold">{project.industry}</dd>
          </div>
          <div>
            <dt className="text-stone">Zakres</dt>
            <dd className="mt-1 font-semibold">{project.scope.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-stone">Czas realizacji</dt>
            <dd className="mt-1 font-semibold">{project.duration}</dd>
          </div>
          {project.url && (
            <div>
              <dt className="text-stone">Strona</dt>
              <dd className="mt-1 font-semibold">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-draw">
                  Odwiedź stronę
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      <div className="container-site mt-16 md:mt-24">
        <ImageReveal className="relative aspect-[4/3] w-full md:aspect-[16/9]">
          <div className="group relative h-full w-full">
            <ProjectVisual project={project} priority sizes="100vw" />
          </div>
        </ImageReveal>
      </div>

      <section className="container-site section-y grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="type-heading text-3xl md:text-4xl">Wyzwanie</h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-stone">{project.challenge}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="type-heading text-3xl md:text-4xl">Rozwiązanie</h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-stone">{project.solution}</p>
        </div>
      </section>

      <section className="bg-ink text-paper" aria-labelledby="efekty">
        <div className="container-site section-y">
          <h2 id="efekty" className="type-heading text-3xl md:text-4xl">
            Efekty
          </h2>
          <dl className="mt-12 grid gap-12 md:grid-cols-2">
            {project.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse border-t border-white/20 pt-6">
                <dt className="mt-3 text-lg text-smoke">{r.label}</dt>
                <dd className="type-display text-[clamp(4rem,10vw,9rem)]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="container-site section-y grid gap-8 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <ImageReveal key={src} className={`relative aspect-[4/5] w-full ${i % 2 ? "md:mt-32" : ""}`}>
              <div className="relative h-full w-full">
                <ProjectVisual project={project} src={src} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            </ImageReveal>
          ))}
        </section>
      )}

      {project.testimonial && (
        <section className="container-site section-y">
          <figure className="max-w-5xl">
            <blockquote className="type-heading text-[clamp(1.75rem,4vw,3.5rem)]">
              „{project.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8 text-[15px]">
              <span className="font-semibold">{project.testimonial.author}</span>
              <span className="text-stone">, {project.testimonial.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {next && next.slug !== project.slug && (
        <section className="border-t border-line">
          <Link
            href={`/realizacje/${next.slug}`}
            data-cursor="Następny projekt"
            className="group container-site block py-20 md:py-32"
          >
            <span className="text-stone">Następny projekt</span>
            <span className="type-display mt-4 block text-[clamp(2.5rem,9vw,8.5rem)] transition-[font-stretch] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[font-stretch:80%]">
              {next.client}
            </span>
          </Link>
        </section>
      )}

      <section className="container-site pb-24 md:pb-32">
        <ButtonLink href="/kontakt" size="lg">
          Chcę podobną stronę
        </ButtonLink>
      </section>
    </article>
  );
}
