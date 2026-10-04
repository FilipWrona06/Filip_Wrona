import { Hero } from "@/components/sections/Hero";
import { ValuesBand } from "@/components/sections/ValuesBand";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { WhyMe } from "@/components/sections/WhyMe";
import { OfferList } from "@/components/sections/OfferList";
import { Process } from "@/components/sections/Process";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedWork />
      <ValuesBand />
      <WhyMe />
      <OfferList />
      <Process />
      <AboutTeaser />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
