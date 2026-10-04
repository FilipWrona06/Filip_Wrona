// Pakiety i ceny. TODO: dostosuj zakres i ceny do swojej oferty.
export const packages = [
  {
    name: "Wizytówka",
    for: "Dla firm, które potrzebują solidnej obecności w sieci.",
    price: "od 1 500 zł",
    time: "7–10 dni",
    includes: [
      "Jedna dopracowana strona z sekcjami",
      "Wersja na telefony i komputery",
      "Formularz kontaktowy",
      "Podstawowe SEO i podpięcie Google",
    ],
  },
  {
    name: "Strona firmowa",
    for: "Dla firm, które chcą pozyskiwać klientów przez internet.",
    price: "od 3 500 zł",
    time: "2–4 tygodnie",
    includes: [
      "Do 8 podstron, np. osobna dla każdej usługi",
      "Indywidualny projekt graficzny",
      "Animacje i mikrointerakcje",
      "SEO lokalne i Profil Firmy w Google",
    ],
  },
  {
    name: "Projekt indywidualny",
    for: "Dla nietypowych potrzeb: portfolio, rezerwacje, integracje.",
    price: "wycena indywidualna",
    time: "ustalany wspólnie",
    includes: [
      "Zakres dopasowany do Twojego biznesu",
      "Integracje z kalendarzem, płatnościami, CRM",
      "Panel do samodzielnej edycji treści",
      "Priorytetowe wsparcie",
    ],
  },
] as const;

export const extras = [
  { name: "Teksty na stronę", price: "od 400 zł" },
  { name: "Logo i identyfikacja", price: "od 800 zł" },
  { name: "Konfiguracja Profilu Firmy w Google", price: "od 300 zł" },
  { name: "Dodatkowa podstrona", price: "od 300 zł" },
];

export const care = {
  name: "Opieka techniczna",
  price: "od 150 zł / mies.",
  includes: [
    "Hosting i domena pod kontrolą",
    "Aktualizacje i kopie zapasowe",
    "Drobne zmiany treści w cenie",
    "Odpowiedź w ciągu jednego dnia roboczego",
  ],
};
