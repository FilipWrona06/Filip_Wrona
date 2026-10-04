import { ogImage, ogSize } from "@/lib/og";

export const alt = "Filip Wrona: tworzenie stron internetowych dla firm";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Strony internetowe dla firm", title: "Strony, które pracują na Twoją firmę" });
}
