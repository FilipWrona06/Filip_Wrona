import Link from "next/link";
import { getPost, postMetadata } from "@/lib/posts";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleJsonLd } from "@/components/blog/ArticleJsonLd";
import { Prose } from "@/components/blog/Prose";
import { Callout } from "@/components/blog/Callout";
import { StepNumber } from "@/components/blog/StepNumber";
import { Checklist } from "@/components/blog/Checklist";
import { PostEnd } from "@/components/blog/PostEnd";

/*
 * Wpis w układzie poradnika: pełnoszerokościowe kroki z dużymi numerami
 * i interaktywna lista kontrolna na końcu. Bez spisu treści, bo kroki same
 * prowadzą czytelnika.
 * TODO: Google co jakiś czas zmienia wygląd panelu. Przed publikacją
 * przejdź kroki samodzielnie i popraw nazwy przycisków, jeśli się zmieniły.
 */

const SLUG = "jak-zalozyc-profil-firmy-w-google";
export const metadata = postMetadata(SLUG);

const steps: { title: string; body: React.ReactNode }[] = [
  {
    title: "Przygotuj dane firmy",
    body: (
      <>
        <p>Zanim zaczniesz, zbierz w jednym miejscu:</p>
        <ul>
          <li>nazwę firmy dokładnie w takiej formie, w jakiej używasz jej na co dzień,</li>
          <li>adres albo obszar, w którym obsługujesz klientów,</li>
          <li>numer telefonu i adres strony internetowej,</li>
          <li>godziny otwarcia,</li>
          <li>kilka dobrych zdjęć: logo, wnętrze, zespół, efekty pracy.</li>
        </ul>
        <p>Dzięki temu cały proces zajmie kilkanaście minut zamiast całego popołudnia.</p>
      </>
    ),
  },
  {
    title: "Wejdź na stronę Profilu Firmy",
    body: (
      <p>
        Otwórz <strong>google.com/business</strong> i zaloguj się kontem Google. Najlepiej
        użyj konta firmowego, a nie prywatnego, żeby w przyszłości łatwo było przekazać dostęp
        pracownikowi albo agencji.
      </p>
    ),
  },
  {
    title: "Wpisz nazwę i wybierz kategorię",
    body: (
      <>
        <p>
          Google zapyta o nazwę firmy i jej kategorię. <strong>Kategoria główna jest jednym z
          najważniejszych ustawień</strong>, bo od niej zależy, przy jakich wyszukiwaniach się
          pojawisz. Wybierz najdokładniejszą możliwą, np. „Fizjoterapeuta” zamiast „Usługi
          medyczne”. Dodatkowe kategorie możesz dodać później.
        </p>
      </>
    ),
  },
  {
    title: "Ustaw lokalizację albo obszar działania",
    body: (
      <p>
        Jeśli klienci przychodzą do Ciebie, podaj adres. Jeśli to Ty dojeżdżasz do klientów albo
        pracujesz zdalnie, możesz ukryć adres i zamiast niego wskazać miasta lub regiony, które
        obsługujesz. To ważne, gdy firma działa z domu.
      </p>
    ),
  },
  {
    title: "Dodaj telefon i stronę internetową",
    body: (
      <p>
        Numer telefonu pozwoli klientom zadzwonić jednym kliknięciem prosto z wyników
        wyszukiwania, a link do strony przekieruje ich tam, gdzie mogą dowiedzieć się więcej.
        Profil i strona wzajemnie się wzmacniają.
      </p>
    ),
  },
  {
    title: "Zweryfikuj firmę",
    body: (
      <>
        <p>
          Google musi potwierdzić, że firma naprawdę istnieje. Metodę wybiera Google. Często jest
          to krótkie nagranie wideo, na którym pokazujesz miejsce prowadzenia działalności i coś, co
          ją potwierdza, ale bywa też telefon, SMS, e-mail albo kod wysłany pocztą.
        </p>
        <p>Weryfikacja może potrwać od kilku minut do kilku dni. Do tego czasu profil nie jest widoczny.</p>
      </>
    ),
  },
  {
    title: "Uzupełnij profil w stu procentach",
    body: (
      <>
        <p>
          Kompletny profil wygląda bardziej wiarygodnie i częściej pojawia się w wynikach. Dodaj
          opis firmy, godziny otwarcia, listę usług z krótkimi opisami i przynajmniej kilka zdjęć.
        </p>
        <p>Zdjęcia prawdziwego miejsca i ludzi działają lepiej niż zdjęcia z banków zdjęć.</p>
      </>
    ),
  },
  {
    title: "Zbieraj opinie i odpowiadaj na nie",
    body: (
      <>
        <p>
          Opinie to waluta lokalnych wyników. Po każdym udanym zleceniu wyślij klientowi link do
          wystawienia opinii, który znajdziesz w panelu profilu. Najlepiej działa prośba wysłana
          tego samego dnia.
        </p>
        <p>
          Odpowiadaj na każdą opinię, także negatywną. Spokojna, rzeczowa odpowiedź na krytykę
          często buduje więcej zaufania niż dziesięć pochwał.
        </p>
      </>
    ),
  },
  {
    title: "Bądź aktywny",
    body: (
      <p>
        Profil to nie wizytówka, którą zakłada się raz. Co jakiś czas dodaj nowe zdjęcia,
        aktualizację albo ofertę, a przy zmianie godzin, na przykład w święta, od razu je popraw.
        Aktywny profil pokazuje, że firma działa.
      </p>
    ),
  },
];

const checklist = [
  "Nazwa firmy zgodna z rzeczywistością, bez dopisanych słów kluczowych",
  "Najdokładniejsza kategoria główna",
  "Adres albo obszar działania",
  "Telefon i link do strony",
  "Profil zweryfikowany",
  "Opis firmy i lista usług",
  "Godziny otwarcia, także świąteczne",
  "Co najmniej 5 prawdziwych zdjęć",
  "Pierwsze opinie od klientów",
  "Odpowiedzi na wszystkie opinie",
];

export default function Page() {
  const post = getPost(SLUG);
  return (
    <article>
      <ArticleJsonLd post={post} />
      <ArticleHeader post={post} wide />

      <section className="container-site pb-8">
        <Prose className="max-w-[44rem] md:ml-[calc(25%+0.5rem)]">
          <p>
            Kiedy ktoś wpisuje w Google „fizjoterapeuta w pobliżu” albo „mechanik samochodowy blisko mnie”, na
            samej górze wyników pojawia się mapa z kilkoma firmami. To właśnie Profile Firm w
            Google. Są darmowe, a dla wielu lokalnych firm przynoszą więcej telefonów niż strona
            internetowa.
          </p>
          <p>Poniżej przeprowadzam Cię przez cały proces, krok po kroku.</p>
          <Callout title="Ważne: nazwa firmy">
            <p>
              Nie dopisuj do nazwy słów kluczowych, np. „Kowalski – najlepszy mechanik w mieście”.
              Zasady Google tego zabraniają, a profil może zostać zawieszony. Wpisz nazwę, której
              naprawdę używasz.
            </p>
          </Callout>
        </Prose>
      </section>

      <ol className="container-site">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-6 border-t border-line py-14 md:grid-cols-12 md:gap-8 md:py-20"
          >
            <div className="md:col-span-3">
              <StepNumber n={i + 1} />
            </div>
            <div className="md:col-span-7 md:col-start-4">
              <h2 className="type-heading text-3xl md:text-[2.6rem]">{step.title}</h2>
              <Prose className="mt-5">{step.body}</Prose>
            </div>
          </li>
        ))}
      </ol>

      <div className="container-site pb-16 md:pb-24">
        <Checklist id="profil-google" title="Lista kontrolna Twojego profilu" items={checklist} />
        <p className="mt-6 max-w-[60ch] text-[15px] text-stone">
          Google co jakiś czas zmienia wygląd panelu, więc nazwy przycisków mogą się nieco różnić od
          opisanych. Kolejność kroków pozostaje jednak taka sama. Wolisz, żeby ktoś to zrobił za
          Ciebie? Konfiguruję profile w ramach <Link href="/oferta" className="underline decoration-violet underline-offset-4">oferty</Link>.
        </p>
      </div>

      <PostEnd slug={SLUG} cta="Skonfiguruj profil ze mną" />
    </article>
  );
}
