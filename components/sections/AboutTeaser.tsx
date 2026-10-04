import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";

export function AboutTeaser() {
  return (
    <section className="container-site section-y grid gap-12 md:grid-cols-12 md:items-end">
      <div className="md:col-span-5">
        <ImageReveal className="relative aspect-[4/5] w-full">
          <PortraitPlaceholder />
        </ImageReveal>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <TextReveal
          text="Cześć, jestem Filip"
          className="type-display text-[clamp(2.25rem,6vw,5.5rem)]"
        />
        <p className="type-lead mt-8 max-w-[40ch] text-xl md:text-2xl">
          Tworzę strony dla firm, które chcą wyglądać w sieci profesjonalnie i nie mają czasu
          zajmować się techniką. Biorę na siebie wszystko: od projektu po domenę i Google.
        </p>
        <p className="mt-6 max-w-[48ch] leading-relaxed text-stone">
          Pracuję sam, więc znam każdy szczegół Twojego projektu i zawsze wiesz, kto za niego
          odpowiada.
        </p>
        <div className="mt-10">
          <ButtonLink href="/o-mnie" variant="outline">
            Więcej o mnie
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
