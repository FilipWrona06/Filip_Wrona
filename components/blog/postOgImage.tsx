import { getPost } from "@/lib/posts";
import { ogImage, ogSize as size } from "@/lib/og";

export const ogSize = size;

// Obrazek do udostępniania wpisu. Każdy wpis ma w swoim folderze plik
// opengraph-image.tsx, który wywołuje tę funkcję.
export function postOgImage(slug: string) {
  const post = getPost(slug);
  return ogImage({ eyebrow: "Blog", title: post.title, footer: `${post.readingMinutes} min czytania · filipwrona.pl` });
}
