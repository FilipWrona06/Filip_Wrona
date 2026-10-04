# filipwrona.pl

Strona osobista Filipa Wrony. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Lenis.

## Uruchomienie

```bash
npm install
npm run dev
```

Strona działa pod http://localhost:3000. Bez klucza Resend formularz nie wysyła maili,
tylko wypisuje treść zapytania w konsoli, więc lokalnie możesz go spokojnie testować.

## Co podmienić przed publikacją

Wszystkie miejsca do uzupełnienia są oznaczone w kodzie komentarzem `TODO`.

1. `lib/site.ts`: telefon, WhatsApp, link do kalendarza (Cal.com), social media.
2. `lib/projects.ts`: realizacje (kancelaria z Chorzowa i Fundacja Maxime) są już opisane.
   Okładki są na razie pobierane ze stron klientów (adresy w `cover`, domeny dozwolone w `next.config.ts`).
   Najlepiej zrób własne zrzuty ekranu w proporcji ok. 1200×630, wrzuć je do `public/realizacje/`
   i wpisz ścieżki w `cover` i `gallery`,
   a gdy zbierzesz dane, uzupełnij `results` i `testimonial`. Trzeci projekt dopisz jako kolejny obiekt.
3. `lib/content.ts`: opinie klientów (tylko prawdziwe). Dopóki lista jest pusta, sekcja opinii się nie pokazuje.
4. `lib/offer.ts`: Twoje pakiety i ceny.
5. `components/ui/PortraitPlaceholder.tsx`: dodaj zdjęcie `public/filip-wrona.jpg` i ustaw `HAS_PHOTO = true`.
6. `app/polityka-prywatnosci/page.tsx`: dane administratora (po założeniu JDG nazwa, adres, NIP).
7. FAQ: sprawdź obietnice (np. 30 dni bezpłatnych poprawek) i dopasuj do swoich warunków.

## SEO

- Tytuły i opisy stron są dopasowane do najważniejszych fraz branży: „tworzenie stron
  internetowych”, „strony internetowe dla firm”, „cennik stron internetowych”, „strona wizytówka”.
- Dane strukturalne dla Google (`lib/seo.tsx`): witryna, firma (ProfessionalService) z ofertą
  i cenami, osoba, okruszki na każdej podstronie, artykuły na blogu, realizacje.
- **Lokalne SEO:** uzupełnij w `lib/site.ts` pola `location` (miasto, województwo),
  `areaServed` (obsługiwane obszary) i `googleBusinessUrl` (link do Profilu Firmy w Google).
  Dane trafią automatycznie do informacji dla Google.
- Obrazki do udostępniania (Facebook, LinkedIn, Messenger) generują się automatycznie
  dla strony głównej, każdej realizacji i każdego wpisu, w kroju strony.
- Mapa strony: `/sitemap.xml`, kanał RSS: `/blog/rss.xml`. Datę aktualizacji treści
  zmieniaj w `site.updated` (lib/site.ts), a nie przy każdym wdrożeniu.

Po publikacji:

1. Dodaj stronę do Google Search Console (wariant „Prefiks URL”), skopiuj kod weryfikacyjny
   i ustaw go w zmiennej `GOOGLE_SITE_VERIFICATION` na Vercelu.
2. W Search Console zgłoś mapę strony: `https://filipwrona.pl/sitemap.xml`.
3. Załóż Profil Firmy w Google (poradnik jest na blogu) i wpisz jego link w `googleBusinessUrl`.
4. Sprawdź wynik na https://pagespeed.web.dev.

## Wydajność

- Font: jeden plik 82 KB (Archivo przycięte do polskich znaków) zamiast ~176 KB, wczytywany
  z wyprzedzeniem, z dopasowanym krojem zapasowym (tekst nie przeskakuje).
- Animacje: efekty wejścia (nagłówki, zdjęcia, linie pędzla, cytaty, FAQ, przyciski) są w czystym
  CSS sterowanym lekkim obserwatorem widoczności (`components/motion/useReveal.ts`).
  Biblioteka Motion zostaje tylko tam, gdzie jest potrzebna (menu, kurtyna, pasek, proces).
- Stado wron startuje, gdy przeglądarka ma wolną chwilę, zasypia, gdy wrony usiądą
  (zero pracy procesora), a na telefonach działa w lżejszym trybie.
- Wszystkie strony są generowane statycznie.

## Bezpieczeństwo i RODO

- Nagłówki bezpieczeństwa w `next.config.ts`: Content-Security-Policy, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Jeśli dodasz zewnętrzny skrypt
  (np. analitykę), dopisz jego domenę do CSP.
- Formularz: pułapka na boty, odrzucanie wysyłek szybszych niż 3 s, limit 5 wiadomości
  na 10 minut z jednego adresu IP, walidacja i limity długości pól na serwerze,
  brak danych osobowych w logach produkcyjnych.
- Strona nie używa ciasteczek ani zewnętrznych narzędzi śledzących, więc nie potrzebuje banera
  cookies. Polityka prywatności (`app/polityka-prywatnosci/page.tsx`) opisuje faktyczne
  przetwarzanie: uzupełnij dane administratora po założeniu działalności.

## Publikacja na Vercel

1. Wrzuć projekt na GitHub i zaimportuj go na vercel.com.
2. W ustawieniach projektu dodaj zmienne z pliku `.env.example`
   (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `GOOGLE_SITE_VERIFICATION`).
3. Podepnij domenę filipwrona.pl (Vercel pokaże, jakie rekordy DNS ustawić u rejestratora).
4. W Resend zweryfikuj domenę, żeby maile z formularza nie trafiały do spamu.

## Struktura

```
app/                    podstrony, SEO (sitemap, robots, obrazek OG), akcja formularza
components/layout/      nagłówek, stopka, kursor, płynne przewijanie
components/motion/      animacje: rozciągany napis, odsłanianie tekstu i zdjęć, liczniki
components/sections/    sekcje strony głównej
components/ui/          przyciski, karty projektów, formularz, akordeon
lib/                    wszystkie treści i dane kontaktowe
```

## Blog

Każdy wpis to osobna podstrona z własnym układem: `app/blog/<slug>/page.tsx`.
Piszesz zwykły React, więc każdy wpis może wyglądać inaczej.

Nowy wpis:

1. Dodaj obiekt w `lib/posts.ts` (tytuł, krótka nazwa, opis, data, czas czytania, tagi).
2. Utwórz folder `app/blog/<slug>/` i skopiuj do niego `page.tsx` z istniejącego wpisu jako punkt wyjścia.
3. Skopiuj też `opengraph-image.tsx` i zmień w nim slug oraz `alt`.

Lista na /blog, mapa strony, kanał RSS (`/blog/rss.xml`), dane dla Google i sekcja
„Przeczytaj też” aktualizują się same na podstawie `lib/posts.ts`.

Gotowe klocki w `components/blog/`: `ArticleHeader` (nagłówek z wroną), `Prose` i `H2`
(typografia tekstu i nagłówki z kotwicami), `Toc` (spis treści), `Callout` (ramka z poradą),
`PullQuote` (wyróżniony cytat), `StepNumber` (duży numer kroku), `Checklist` (interaktywna
lista kontrolna), `PostEnd` (zakończenie z CTA i podobnymi wpisami). Elementy, które nie mają
dziedziczyć stylów tekstu artykułu, oznacz klasą `not-prose`.

Przykłady dwóch różnych układów: `ile-kosztuje-strona-internetowa` (magazynowy, ze spisem
treści) i `jak-zalozyc-profil-firmy-w-google` (poradnik z krokami i listą kontrolną).

## Animacje i efekty

- Napis ze stada wron w hero i na stronie 404 (`components/motion/CrowFlock.tsx`):
  ptaki przylatują i układają się w litery, płoszą przed kursorem i kliknięciem,
  odlatują przy przewijaniu. W ruchu połyskują fioletem jak pióra wrony.
  Na telefonie napis układa się w dwóch liniach.
- Znak wrony przy logo macha skrzydłami po najechaniu (`components/ui/CrowMark.tsx`),
  ta sama sylwetka jest w faviconie (`app/icon.svg`).
- Wielki napis w stopce: litery pod kursorem rozszerzają się, pogrubiają
  i nabierają fioletu (`components/motion/StretchWord.tsx`).
- Menu zawsze widoczne, po przewinięciu zmienia się w małą pigułkę z linią postępu czytania
  (`components/layout/Header.tsx`).
- Przejścia między podstronami: kurtyna z nazwą podstrony (`components/layout/PageTransition.tsx`).
  Działa automatycznie dla wszystkich wewnętrznych linków. Nazwy podstron ustawiasz w `lib/routes.ts`.
- Manifest czytany przewijaniem (`components/motion/ScrollWords.tsx`).
- Pasek z hasłami reagujący na prędkość i kierunek scrolla (`components/motion/VelocityMarquee.tsx`).
- Menu: podświetlenie płynnie przesuwa się za kursorem, bieżąca strona ma fioletową kropkę;
  w stopce bieżąca strona jest zaznaczona fioletową kreską.
- Stopka wyłaniająca się spod treści, przyciski wypełniające się kolorem, etykieta
  „Zobacz projekt” przy kursorze nad realizacjami.

### Wabi-sabi

- Tło w kolorze naturalnego papieru z fakturą włókien na osobnej, nieruchomej warstwie pod treścią (`.paper-texture` w `app/globals.css`),
  czerń tuszu zamiast czystej czerni.
- Linie pędzla zamiast idealnych kresek (`components/ui/BrushLine.tsx`).
- Ensō malowane w kurtynie przejścia (`components/ui/Enso.tsx`).
- Na podstronach wrony przelatują przez nagłówek, jedna przysiada na pierwszej literze tytułu,
  po chwili odlatuje i zostawia opadające pióro (`components/motion/HeaderCrows.tsx`).
- Fioletowa pieczęć „FW” w stopce i na stronie O mnie (`components/ui/Seal.tsx`).

Kolor akcentu zmienisz w jednym miejscu: `--color-violet` w `app/globals.css`.

Reakcje na mysz (etykieta przy kursorze, napis w stopce) włączają się tylko na urządzeniach
z myszką. Animacje działają zawsze, niezależnie od systemowego ustawienia „ogranicz ruch”.
