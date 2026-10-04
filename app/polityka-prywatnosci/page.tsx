import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

// TODO: to jest szablon. Uzupełnij dane administratora (po założeniu JDG: nazwa firmy, adres, NIP)
// i dostosuj treść do narzędzi, których faktycznie używasz. W razie wątpliwości skonsultuj się z prawnikiem.
export default function PrivacyPage() {
  return (
    <article className="container-site pt-36 pb-24 md:pt-48 md:pb-40">
      <h1 className="type-display text-[clamp(2.25rem,7vw,6.5rem)]">Polityka prywatności</h1>
      <div className="mt-14 max-w-[68ch] space-y-10 text-lg leading-relaxed">
        <section>
          <h2 className="type-heading text-2xl">Administrator danych</h2>
          <p className="mt-3 text-stone">
            Administratorem Twoich danych osobowych jest {site.name}, kontakt: {site.email}.
          </p>
        </section>
        <section>
          <h2 className="type-heading text-2xl">Jakie dane zbieram i po co</h2>
          <p className="mt-3 text-stone">
            Gdy wysyłasz formularz kontaktowy, przetwarzam podane w nim dane (imię, adres e-mail,
            opcjonalnie telefon i treść wiadomości) wyłącznie po to, żeby odpowiedzieć na Twoje
            zapytanie i przygotować wycenę. Podstawą prawną jest Twoja zgoda (art. 6 ust. 1 lit. a
            RODO) oraz działania przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).
          </p>
        </section>
        <section>
          <h2 className="type-heading text-2xl">Jak długo przechowuję dane</h2>
          <p className="mt-3 text-stone">
            Dane z zapytań przechowuję do zakończenia korespondencji, a jeśli dojdzie do współpracy,
            przez czas wymagany przepisami podatkowymi i rachunkowymi.
          </p>
        </section>
        <section>
          <h2 className="type-heading text-2xl">Komu przekazuję dane</h2>
          <p className="mt-3 text-stone">
            Dane mogą być przetwarzane przez dostawców usług, z których korzystam: hosting strony
            (Vercel) oraz wysyłkę wiadomości e-mail (Resend). Nie sprzedaję i nie udostępniam danych
            w celach marketingowych.
          </p>
        </section>
        <section>
          <h2 className="type-heading text-2xl">Statystyki i pliki cookies</h2>
          <p className="mt-3 text-stone">
            Strona nie używa plików cookies do śledzenia. Jeśli korzystam z anonimowych statystyk
            odwiedzin, nie pozwalają one na identyfikację konkretnej osoby.
          </p>
        </section>
        <section>
          <h2 className="type-heading text-2xl">Twoje prawa</h2>
          <p className="mt-3 text-stone">
            Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia
            przetwarzania, przeniesienia oraz cofnięcia zgody w dowolnym momencie. Możesz też złożyć
            skargę do Prezesa Urzędu Ochrony Danych Osobowych. W każdej sprawie napisz na{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
