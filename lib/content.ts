// Treści wspólne: korzyści, proces, opinie, FAQ.

export const benefits = [
  {
    title: "Rozmawiasz z wykonawcą",
    text: "Bez account managerów i głuchego telefonu. Piszesz do mnie, odpowiadam ja.",
  },
  {
    title: "Strona, która się nie zacina",
    text: "Kod pisany od zera w Next.js, bez ciężkich szablonów. Ładuje się szybko nawet na słabym zasięgu.",
  },
  {
    title: "Widoczność w Google",
    text: "Struktura, treści i wizytówka Google przygotowane tak, żeby klienci z okolicy mogli Cię znaleźć.",
  },
  {
    title: "Wsparcie po starcie",
    text: "Nie znikam po oddaniu projektu. Pomagam w zmianach i pilnuję, żeby wszystko działało.",
  },
];

export const process = [
  {
    title: "Rozmowa",
    text: "Krótka, bezpłatna rozmowa o Twojej firmie, klientach i celu strony. Po niej dostajesz konkretną wycenę i termin.",
  },
  {
    title: "Projekt",
    text: "Przygotowuję projekt graficzny. Widzisz, jak będzie wyglądać strona, zanim powstanie choć jedna linijka kodu.",
  },
  {
    title: "Wdrożenie",
    text: "Koduję stronę, podpinam domenę, formularze i Google. Sprawdzasz wszystko na wersji testowej.",
  },
  {
    title: "Start i wsparcie",
    text: "Strona trafia do sieci. Pokazuję, jak z niej korzystać, i zostaję do Twojej dyspozycji.",
  },
];

// Opinie klientów: wpisuj wyłącznie prawdziwe. Dopóki lista jest pusta, sekcja opinii się nie pokazuje.
// Przykład: { quote: "…", author: "Imię N.", company: "Nazwa firmy" }
export const testimonials: { quote: string; author: string; company: string }[] = [];

export const faq = [
  {
    q: "Ile kosztuje strona internetowa?",
    a: "Prosta strona wizytówka zaczyna się od 1 500 zł, rozbudowana strona firmowa od 3 500 zł. Dokładną cenę podaję po krótkiej rozmowie, bo zależy od liczby podstron i funkcji.",
  },
  {
    q: "Ile trwa realizacja?",
    a: "Wizytówka zwykle 7–10 dni, strona firmowa 2–4 tygodnie. Termin zapisujemy w umowie.",
  },
  {
    q: "Czy będę mógł sam zmieniać treści?",
    a: "Tak. Jeśli chcesz samodzielnie edytować teksty i zdjęcia, podpinam prosty panel. Możesz też zostawić to mnie w ramach opieki technicznej.",
  },
  {
    q: "Co z hostingiem i domeną?",
    a: "Pomagam wybrać i skonfigurować jedno i drugie. Domena jest zawsze zarejestrowana na Ciebie, więc nigdy nie tracisz nad nią kontroli.",
  },
  {
    q: "Co jeśli po starcie coś przestanie działać?",
    a: "Przez 30 dni po starcie poprawiam błędy bezpłatnie. Później możesz skorzystać z miesięcznej opieki technicznej albo zgłaszać zmiany jednorazowo.",
  },
  {
    q: "Czy potrzebuję gotowych tekstów i zdjęć?",
    a: "Nie musisz. Mogę napisać teksty i doradzić, jakie zdjęcia przygotować. Jeśli masz własne materiały, tym lepiej.",
  },
];
