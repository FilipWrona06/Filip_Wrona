// Wszystkie dane kontaktowe i linki w jednym miejscu.
// TODO: uzupełnij telefon i linki do social mediów.
export const site = {
  name: "Filip Wrona",
  tagline: "Strony internetowe dla firm",
  url: "https://filipwrona.pl",
  email: "kontakt@filipwrona.pl",
  phone: "+48 000 000 000",
  phoneHref: "tel:+48000000000",
  whatsapp: "https://wa.me/48000000000",
  booking: "https://cal.com/filipwrona/15min",
  area: "Cała Polska, zdalnie",
  description:
    "Projektuję i koduję szybkie, nowoczesne strony internetowe dla firm. Bez pośredników: rozmawiasz bezpośrednio ze mną, od pierwszego szkicu po wsparcie po starcie.",
  socials: [
    { label: "Instagram", href: "https://instagram.com/filipwrona" },
    { label: "Facebook", href: "https://facebook.com/filipwrona" },
    { label: "LinkedIn", href: "https://linkedin.com/in/filipwrona" },
  ],
  nav: [
    { label: "Realizacje", href: "/realizacje" },
    { label: "Oferta", href: "/oferta" },
    { label: "O mnie", href: "/o-mnie" },
  ],
} as const;
