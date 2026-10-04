import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ValuesBand } from "@/components/sections/ValuesBand";
import { WhyMe } from "@/components/sections/WhyMe";
import { OfferList } from "@/components/sections/OfferList";
import { ProcessCompact } from "@/components/sections/ProcessCompact";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Faq } from "@/components/sections/Faq";
import { HomeContact } from "@/components/sections/HomeContact";

// Strona główna to skrót całej witryny: z każdej części najważniejsze rzeczy
// i przejście do szczegółów, a na końcu formularz kontaktowy.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedWork />
      <ValuesBand />
      <WhyMe />
      <OfferList moreLink />
      <ProcessCompact />
      <AboutTeaser />
      <LatestPosts />
      <Faq limit={4} more={{ href: "/oferta", label: "Więcej pytań w ofercie" }} />
      <HomeContact />
    </>
  );
}
