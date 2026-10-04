// Wszystkie dane firmy, kontaktu i SEO w jednym miejscu.
// TODO: uzupełnij telefon, WhatsApp, Facebook i LinkedIn.

export type SiteLocation = {
  /** Miasto, w którym działasz (np. "Katowice"). Puste = działasz zdalnie w całej Polsce. */
  city: string;
  /** Województwo (np. "śląskie"). */
  region: string;
  postalCode: string;
  /** Ulica. Zostaw puste, jeśli pracujesz z domu i nie chcesz pokazywać adresu. */
  street: string;
  lat: number | null;
  lng: number | null;
};

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
    "Tworzę szybkie, nowoczesne strony internetowe dla firm: indywidualny projekt, kodowanie w Next.js, SEO i Profil Firmy w Google. Bezpośredni kontakt z wykonawcą i bezpłatna wycena.",

  /**
   * Lokalne SEO. Uzupełnij miasto i województwo, a pojawią się w danych dla Google
   * (adres firmy, obszar działania). Ulicę podaj tylko, jeśli przyjmujesz klientów.
   */
  location: {
    city: "",
    region: "",
    postalCode: "",
    street: "",
    lat: null,
    lng: null,
  } as SiteLocation,

  /** Obszary, które obsługujesz (do danych dla Google). Np. ["Polska", "Śląsk", "Katowice"]. */
  areaServed: ["Polska"],

  /** Link do Twojego Profilu Firmy w Google (po założeniu). Wzmacnia powiązanie strony z wizytówką. */
  googleBusinessUrl: "",

  /** Najważniejsze tematy, w których się specjalizujesz (dane dla Google, nie meta keywords). */
  expertise: [
    "Tworzenie stron internetowych",
    "Projektowanie stron www",
    "Strony internetowe dla firm",
    "Strony wizytówki",
    "Next.js",
    "SEO lokalne",
    "Profil Firmy w Google",
    "Optymalizacja szybkości stron",
  ],

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/filip_wrona/" },
    { label: "Facebook", href: "https://facebook.com/filipwrona" },
    { label: "LinkedIn", href: "https://linkedin.com/in/filipwrona" },
    { label: "GitHub", href: "https://github.com/FilipWrona06" },
  ],

  nav: [
    { label: "Realizacje", href: "/realizacje" },
    { label: "Oferta", href: "/oferta" },
    { label: "O mnie", href: "/o-mnie" },
    { label: "Blog", href: "/blog" },
  ],

  /** Data ostatniej większej aktualizacji treści (do mapy strony). */
  updated: "2026-10-04",
};
