import { site } from "@/lib/site";
import { packages } from "@/lib/offer";

/** Wstawia dane strukturalne JSON-LD dla Google. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // znak „<” zamieniamy, żeby treść nie mogła zamknąć znacznika <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const priceFrom = (p: string) => {
  const n = Number(p.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/** Graf całej witryny: strona, firma (z ofertą i obszarem działania) i osoba. */
export function siteGraph() {
  const loc = site.location;
  const hasAddress = Boolean(loc.city);
  const offers = packages
    .map((p) => {
      const min = priceFrom(p.price);
      return {
        "@type": "Offer",
        name: p.name,
        description: p.for,
        itemOffered: { "@type": "Service", name: `Strona internetowa: ${p.name}`, description: p.includes.join(", ") },
        ...(min
          ? { priceSpecification: { "@type": "PriceSpecification", minPrice: min, priceCurrency: "PLN" } }
          : {}),
      };
    });
  const sameAs = [...site.socials.map((s) => s.href), ...(site.googleBusinessUrl ? [site.googleBusinessUrl] : [])];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "pl-PL",
        publisher: { "@id": `${site.url}/#business` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: `${site.name}, ${site.tagline.toLowerCase()}`,
        alternateName: site.name,
        description: site.description,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        image: `${site.url}/opengraph-image`,
        logo: `${site.url}/icon.svg`,
        priceRange: "od 1 500 zł",
        currenciesAccepted: "PLN",
        knowsAbout: site.expertise,
        areaServed: site.areaServed.map((a) =>
          a === "Polska" ? { "@type": "Country", name: "Polska" } : { "@type": "Place", name: a },
        ),
        ...(hasAddress
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: loc.city,
                addressRegion: loc.region,
                postalCode: loc.postalCode || undefined,
                streetAddress: loc.street || undefined,
                addressCountry: "PL",
              },
            }
          : {}),
        ...(loc.lat && loc.lng ? { geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng } } : {}),
        founder: { "@id": `${site.url}/#person` },
        sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Strony internetowe dla firm",
          itemListElement: offers,
        },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: "Twórca stron internetowych",
        url: `${site.url}/o-mnie`,
        knowsAbout: site.expertise,
        worksFor: { "@id": `${site.url}/#business` },
        sameAs: site.socials.map((s) => s.href),
      },
    ],
  };
}

/** Okruszki (ścieżka strony) dla Google, np. Start › Blog › Tytuł wpisu. */
export function breadcrumbs(items: { name: string; path: string }[]) {
  const all = [{ name: "Strona główna", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
