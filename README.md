# filipwrona.pl

Strona osobista Filipa Wrony. Next.js (App Router), TypeScript, Tailwind CSS 4, Motion, Lenis.

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
2. `lib/projects.ts`: prawdziwe realizacje. Zrzuty ekranu wrzuć do `public/realizacje/`
   i wpisz ścieżki w polach `cover` oraz `gallery`, np. `cover: "/realizacje/warsztat.jpg"`.
3. `lib/content.ts`: prawdziwe opinie klientów i liczby w licznikach (tylko prawdziwe wartości).
4. `lib/offer.ts`: Twoje pakiety i ceny.
5. `components/ui/PortraitPlaceholder.tsx`: dodaj zdjęcie `public/filip-wrona.jpg` i ustaw `HAS_PHOTO = true`.
6. `app/polityka-prywatnosci/page.tsx`: dane administratora (po założeniu JDG nazwa, adres, NIP).
7. FAQ: sprawdź obietnice (np. 30 dni bezpłatnych poprawek) i dopasuj do swoich warunków.

## Publikacja na Vercel

1. Wrzuć projekt na GitHub i zaimportuj go na vercel.com.
2. W ustawieniach projektu dodaj zmienne z pliku `.env.example`.
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
