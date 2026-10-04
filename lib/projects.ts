// Realizacje. Każdy obiekt to osobna podstrona /realizacje/[slug].
// TODO: podmień przykładowe dane na swoich trzech klientów.
// Zrzuty ekranu wrzuć do /public/realizacje/ i wpisz ścieżki w `cover` i `gallery`.
// Dopóki nie ma zdjęć, strona pokazuje typograficzną zaślepkę.

export type Project = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  scope: string[];
  duration: string;
  url?: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  cover?: string;
  gallery?: string[];
  testimonial?: { quote: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "pracownia-fizjoterapii",
    client: "Pracownia Fizjoterapii",
    industry: "Zdrowie",
    year: "2026",
    scope: ["Projekt graficzny", "Strona w Next.js", "Rezerwacje online"],
    duration: "3 tygodnie",
    url: "https://example.com",
    summary:
      "Nowa strona z rezerwacją wizyt, która odciążyła telefon w gabinecie.",
    challenge:
      "Pacjenci umawiali się wyłącznie telefonicznie, a stara strona nie działała dobrze na telefonach. Właścicielka traciła czas na odbieranie połączeń w trakcie zabiegów.",
    solution:
      "Zaprojektowałem prostą stronę z cennikiem, opisem zabiegów i rezerwacją online podpiętą pod kalendarz gabinetu. Każda usługa ma własną podstronę, którą łatwo znaleźć w Google.",
    results: [
      { value: "62%", label: "wizyt umawianych online" },
      { value: "0,9 s", label: "czas ładowania na telefonie" },
    ],
    testimonial: {
      quote:
        "W końcu nie muszę przerywać zabiegów, żeby odebrać telefon. Pacjenci sami wybierają termin.",
      author: "Anna K.",
      role: "właścicielka gabinetu",
    },
  },
  {
    slug: "warsztat-samochodowy",
    client: "Warsztat Samochodowy",
    industry: "Motoryzacja",
    year: "2026",
    scope: ["Strona firmowa", "Profil Firmy w Google", "SEO lokalne"],
    duration: "2 tygodnie",
    url: "https://example.com",
    summary:
      "Strona i wizytówka Google, dzięki którym warsztat pojawia się w lokalnych wynikach wyszukiwania.",
    challenge:
      "Warsztat istniał tylko na Facebooku, więc osoby szukające mechanika w okolicy w ogóle go nie znajdowały.",
    solution:
      "Zbudowałem stronę z listą usług, galerią i formularzem wyceny, a do tego skonfigurowałem Profil Firmy w Google i powiązałem go ze stroną.",
    results: [
      { value: "3×", label: "więcej zapytań miesięcznie" },
      { value: "Top 3", label: "w mapach dla lokalnych fraz" },
    ],
  },
  {
    slug: "studio-wnetrz",
    client: "Studio Wnętrz",
    industry: "Architektura wnętrz",
    year: "2026",
    scope: ["Projekt graficzny", "Portfolio", "Animacje"],
    duration: "4 tygodnie",
    url: "https://example.com",
    summary:
      "Portfolio, w którym projekty wnętrz są głównym bohaterem, a nie tłem.",
    challenge:
      "Studio pokazywało realizacje na Instagramie, ale bez strony trudno było przekonać większych klientów inwestycyjnych.",
    solution:
      "Stworzyłem minimalistyczne portfolio z dużymi zdjęciami, płynnymi przejściami i osobną podstroną dla każdego projektu. Zdjęcia ładują się w nowoczesnych formatach, więc strona pozostaje szybka.",
    results: [
      { value: "98", label: "punktów w PageSpeed" },
      { value: "2", label: "nowe zlecenia w pierwszym miesiącu" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
