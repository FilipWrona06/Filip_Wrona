import type { Post } from "@/lib/posts";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbs } from "@/lib/seo";

// Dane strukturalne artykułu dla Google (data, autor, wydawca, obrazek).
export function ArticleJsonLd({ post }: { post: Post }) {
  const url = `${site.url}/blog/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "pl-PL",
    mainEntityOfPage: url,
    url,
    image: `${url}/opengraph-image`,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
  };
  return (
    <>
      <JsonLd data={data} />
      <JsonLd
        data={breadcrumbs([
          { name: "Blog", path: "/blog" },
          { name: post.shortTitle, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
