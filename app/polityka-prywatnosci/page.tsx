import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Jak przetwarzam dane osobowe na stronie filipwrona.pl: formularz kontaktowy, dostawcy usług, Twoje prawa.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

/*
 * TODO: to rzetelny szablon opisujący to, co strona faktycznie robi, ale nie porada prawna.
 * Po założeniu działalności uzupełnij dane administratora (nazwa firmy, adres, NIP).
 * Jeśli dodasz analitykę, mapę, czat lub inne narzędzia zewnętrzne, dopisz je tutaj.
 * W razie wątpliwości skonsultuj treść z prawnikiem.
 */
const UPDATED = "4 października 2026";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Administrator danych",
    body: (
      <p>
        Administratorem Twoich danych osobowych jest {site.name} (dalej: „ja”). W sprawach
        dotyczących danych osobowych możesz pisać na adres{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
  {
    title: "2. Jakie dane przetwarzam i w jakim celu",
    body: (
      <>
        <p>
          <strong>Formularz kontaktowy.</strong> Gdy wysyłasz formularz, przetwarzam podane w nim
          dane: imię, adres e-mail, opcjonalnie numer telefonu, rodzaj projektu, orientacyjny budżet
          i treść wiadomości. Robię to wyłącznie po to, żeby odpowiedzieć na zapytanie i przygotować
          wycenę.
        </p>
        <p>
          <strong>Kontakt e-mailowy i telefoniczny.</strong> Jeśli piszesz lub dzwonisz bezpośrednio,
          przetwarzam dane potrzebne do prowadzenia rozmowy.
        </p>
        <p>
          <strong>Dane techniczne.</strong> Serwer hostingu automatycznie zapisuje w logach
          podstawowe informacje o połączeniu (m.in. adres IP, datę, typ przeglądarki). Służą one
          wyłącznie zapewnieniu bezpieczeństwa i działania strony, np. ochronie formularza przed
          spamem.
        </p>
      </>
    ),
  },
  {
    title: "3. Podstawa prawna",
    body: (
      <ul>
        <li>Twoja zgoda (art. 6 ust. 1 lit. a RODO), którą wyrażasz, zaznaczając pole w formularzu.</li>
        <li>Działania przed zawarciem umowy, podejmowane na Twoje żądanie (art. 6 ust. 1 lit. b RODO), np. przygotowanie wyceny.</li>
        <li>Mój prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO): bezpieczeństwo strony i ewentualne dochodzenie roszczeń.</li>
        <li>Obowiązki prawne (art. 6 ust. 1 lit. c RODO), np. przechowywanie dokumentów księgowych po zawarciu umowy.</li>
      </ul>
    ),
  },
  {
    title: "4. Jak długo przechowuję dane",
    body: (
      <p>
        Dane z zapytań przechowuję do zakończenia korespondencji, a jeśli nie dojdzie do współpracy,
        nie dłużej niż 12 miesięcy od ostatniego kontaktu. Jeśli podpiszemy umowę, dane związane z
        jej realizacją przechowuję przez okres wymagany przepisami podatkowymi i rachunkowymi. Logi
        serwera są usuwane automatycznie przez dostawcę hostingu.
      </p>
    ),
  },
  {
    title: "5. Komu przekazuję dane",
    body: (
      <>
        <p>Nie sprzedaję danych i nie udostępniam ich w celach marketingowych. Dane mogą trafiać do dostawców usług, z których korzystam przy prowadzeniu strony:</p>
        <ul>
          <li><strong>Vercel Inc.</strong>: hosting strony.</li>
          <li><strong>Resend</strong>: techniczna wysyłka wiadomości z formularza na moją skrzynkę.</li>
          <li><strong>Dostawca poczty e-mail</strong>: przechowywanie korespondencji.</li>
        </ul>
        <p>
          Część z tych firm ma siedzibę w Stanach Zjednoczonych. Przekazanie danych odbywa się na
          podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony
          (EU-US Data Privacy Framework) lub standardowych klauzul umownych zatwierdzonych przez
          Komisję Europejską.
        </p>
      </>
    ),
  },
  {
    title: "6. Pliki cookies i pamięć przeglądarki",
    body: (
      <>
        <p>
          Strona <strong>nie używa plików cookies</strong> do śledzenia, reklam ani statystyk i nie
          korzysta z zewnętrznych narzędzi analitycznych. Dlatego nie wyświetla banera cookies.
          Fonty są serwowane z mojego serwera, a nie z zewnętrznych usług.
        </p>
        <p>
          Wyjątkiem jest lista kontrolna w niektórych wpisach na blogu: zaznaczone przez Ciebie punkty
          zapisują się wyłącznie w pamięci Twojej przeglądarki (localStorage), żebyś mógł wrócić do
          listy później. Te informacje nie są do mnie wysyłane i możesz je usunąć, czyszcząc dane
          strony w przeglądarce.
        </p>
      </>
    ),
  },
  {
    title: "7. Linki do innych stron",
    body: (
      <p>
        Strona zawiera linki do innych serwisów (np. moich profili w mediach społecznościowych,
        kalendarza do umawiania rozmów czy stron moich klientów). Po przejściu na nie obowiązują
        polityki prywatności ich właścicieli.
      </p>
    ),
  },
  {
    title: "8. Twoje prawa",
    body: (
      <>
        <p>Masz prawo do:</p>
        <ul>
          <li>dostępu do swoich danych i otrzymania ich kopii,</li>
          <li>sprostowania nieprawidłowych danych,</li>
          <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
          <li>ograniczenia przetwarzania,</li>
          <li>przenoszenia danych,</li>
          <li>sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
          <li>cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem wcześniejszego przetwarzania.</li>
        </ul>
        <p>
          Aby skorzystać z tych praw, napisz na <a href={`mailto:${site.email}`}>{site.email}</a>.
          Masz też prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2,
          00-193 Warszawa).
        </p>
      </>
    ),
  },
  {
    title: "9. Dobrowolność i bezpieczeństwo",
    body: (
      <p>
        Podanie danych jest dobrowolne, ale bez nich nie mogę odpowiedzieć na zapytanie. Strona
        działa wyłącznie przez szyfrowane połączenie (HTTPS), a formularz jest chroniony przed
        spamem i nadużyciami. Nie podejmuję wobec Ciebie decyzji opartych wyłącznie na
        zautomatyzowanym przetwarzaniu, w tym profilowaniu.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <article className="container-site pt-36 pb-24 md:pt-48 md:pb-40">
      <h1 className="type-display text-[clamp(2.25rem,7vw,6.5rem)]">Polityka prywatności</h1>
      <p className="mt-6 text-stone">Ostatnia aktualizacja: {UPDATED}</p>
      <div className="prose-wrona mt-14 max-w-[68ch]">
        {sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </article>
  );
}
