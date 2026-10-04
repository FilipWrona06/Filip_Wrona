import { getProject, projects } from "@/lib/projects";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Realizacja: strona internetowa";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({ eyebrow: "Realizacja", title: p ? p.client : "Realizacja", dark: true });
}
