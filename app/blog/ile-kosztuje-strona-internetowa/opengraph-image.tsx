import { postOgImage, ogSize } from "@/components/blog/postOgImage";

export const alt = "Ile kosztuje strona internetowa dla firmy w 2026 roku?";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return postOgImage("ile-kosztuje-strona-internetowa");
}
