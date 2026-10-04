import type { Metadata } from "next";
import { NotFoundHero } from "@/components/sections/NotFoundHero";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundHero />;
}
