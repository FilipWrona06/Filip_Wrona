// Realizacje. Każdy obiekt to osobna podstrona /realizacje/[slug].
// Opisy powstały na podstawie tego, co widać na gotowych stronach.
// TODO: dopisz własnymi słowami kulisy projektu (jak wyglądała współpraca, co było najtrudniejsze),
// a gdy zbierzesz dane, dodaj `results` (np. liczba zapytań) i opinię klienta w `testimonial`.
// Zrzuty ekranu wrzuć do /public/realizacje/ i wpisz ścieżki w `cover` i `gallery`.
// Dopóki nie ma zdjęć, strona pokazuje typograficzną zaślepkę.

export type Project = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  scope: string[];
  url?: string;
  summary: string;
  challenge: string;
  solution: string;
  /** co zawiera strona: krótkie punkty */
  features: string[];
  tech: string[];
  duration?: string;
  results?: { value: string; label: string }[];
  cover?: string;
  gallery?: string[];
  testimonial?: { quote: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "upadlosc-konsumencka-chorzow",
    client: "Upadłość Konsumencka Chorzów",
    industry: "Kancelaria oddłużeniowa",
    year: "2026",
    scope: ["Projekt graficzny", "Strona w Next.js", "SEO lokalne", "Formularz konsultacji"],
    url: "https://upadlosckonsumenckachorzow.pl",
    summary:
      "Strona kancelarii oddłużeniowej, która prowadzi osobę w trudnej sytuacji od pierwszego niepokoju do bezpłatnej konsultacji.",
    challenge:
      "Po pomoc w upadłości konsumenckiej sięgają ludzie w stresie, często zawstydzeni swoją sytuacją. Strona musiała budzić zaufanie od pierwszej sekundy, tłumaczyć skomplikowaną procedurę prostym językiem i docierać do osób szukających pomocy w Chorzowie i na całym Śląsku.",
    solution:
      "Zaprojektowałem stronę jako spokojną ścieżkę: najpierw rozpoznanie problemu („Długi przejęły kontrolę nad Twoim życiem?”), potem procedura rozpisana na pięć zrozumiałych kroków, przejrzysty cennik bez ukrytych kosztów, odpowiedzi na najczęstsze obawy i formularz bezpłatnej konsultacji. Numer telefonu jest pod ręką na każdym etapie, a lokalne SEO wzmacnia widoczność w regionie.",
    features: [
      "Ścieżka od problemu do bezpłatnej konsultacji",
      "Procedura upadłości w pięciu krokach",
      "Przejrzysty cennik z ratami",
      "Najczęstsze pytania i obawy",
      "Formularz konsultacji i telefon zawsze pod ręką",
      "Mapa Google ładowana dopiero po kliknięciu",
      "Lokalne SEO dla Chorzowa i Śląska",
      "Dział publikacji",
    ],
    tech: ["Next.js", "SEO lokalne", "RODO i cookies"],
    // Grafika ze strony klienta. Najlepiej podmień ją na zrzut ekranu zapisany w /public/realizacje/.
    cover: "https://www.upadlosckonsumenckachorzow.pl/og-image.jpg",
  },
  {
    slug: "fundacja-maxime",
    client: "Fundacja Maxime",
    industry: "Kultura i muzyka",
    year: "2026",
    scope: ["Projekt graficzny", "Rozbudowana strona w Next.js", "Wydarzenia i galerie", "Newsletter"],
    url: "https://www.maxime.com.pl",
    summary:
      "Rozbudowana strona fundacji i orkiestry: wydarzenia, aktualności, galerie i newsletter w jednym, scenicznym klimacie.",
    challenge:
      "Fundacja potrzebowała miejsca, które odda emocje koncertów, a jednocześnie będzie praktycznym narzędziem: kalendarzem wydarzeń, kroniką działalności i stałym kanałem kontaktu z publicznością.",
    solution:
      "Postawiłem na ciemną, sceniczną estetykę z materiałem wideo w nagłówku, który od razu przenosi na koncert. Wydarzenia, aktualności i galerie mają osobne działy z własnymi podstronami, publiczność może zostawiać opinie, a zapis do newslettera pomaga budować grono stałych słuchaczy.",
    features: [
      "Wideo w nagłówku strony",
      "Kalendarz wydarzeń z podstronami",
      "Aktualności fundacji",
      "Galerie zdjęć z koncertów",
      "Opinie publiczności",
      "Zapis do newslettera",
      "Regulamin, polityka prywatności i cookies",
    ],
    tech: ["Next.js", "Wielostronicowa struktura", "Newsletter"],
    // Kadr z nagłówka strony klienta. Najlepiej podmień go na zrzut ekranu zapisany w /public/realizacje/.
    cover: "https://www.maxime.com.pl/video-poster.webp",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
