import Link from "next/link";
import { getPost, postMetadata } from "@/lib/posts";
import { packages, care } from "@/lib/offer";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleJsonLd } from "@/components/blog/ArticleJsonLd";
import { Prose, H2 } from "@/components/blog/Prose";
import { Callout } from "@/components/blog/Callout";
import { PullQuote } from "@/components/blog/PullQuote";
import { Toc } from "@/components/blog/Toc";
import { PostEnd } from "@/components/blog/PostEnd";

/*
 * Wpis w układzie magazynowym: przyklejony spis treści po lewej, tekst po prawej.
 * TODO: przeczytaj tekst i dopasuj widełki cenowe do własnego doświadczenia.
 * To orientacyjne kwoty z rynku, nie cennik.
 */

const SLUG = "ile-kosztuje-strona-internetowa";
export const metadata = postMetadata(SLUG);

const toc = [
  { id: "krotko", label: "Krótka odpowiedź" },
  { id: "cztery-drogi", label: "Cztery drogi do strony" },
  { id: "co-wplywa-na-cene", label: "Co wpływa na cenę" },
  { id: "utrzymanie", label: "Koszty utrzymania" },
  { id: "na-co-uwazac", label: "Na co uważać" },
  { id: "u-mnie", label: "Ile kosztuje u mnie" },
];

const paths = [
  {
    name: "Kreator stron",
    example: "np. Wix, Squarespace",
    price: "od kilkudziesięciu zł miesięcznie",
    who: "Dla osób, które chcą zrobić stronę samodzielnie i mają na to czas.",
    plus: "Niski koszt na start, wszystko w jednym miejscu.",
    minus: "Płacisz co miesiąc bez końca, strona wygląda jak tysiące innych, trudno się przenieść.",
  },
  {
    name: "Gotowy szablon",
    example: "zwykle WordPress",
    price: "ok. 1 000–3 000 zł",
    who: "Dla firm, które potrzebują strony szybko i tanio.",
    plus: "Szybko i niedrogo, łatwa edycja treści.",
    minus: "Ciężkie wtyczki spowalniają stronę, wymaga regularnych aktualizacji, wygląd jak u konkurencji.",
  },
  {
    name: "Twórca niezależny",
    example: "projekt indywidualny",
    price: "ok. 2 500–10 000 zł",
    who: "Dla firm, które chcą się wyróżnić i pozyskiwać klientów przez internet.",
    plus: "Projekt pod Twoją firmę, bezpośredni kontakt z wykonawcą, dobra relacja ceny do jakości.",
    minus: "Jedna osoba ma ograniczony czas, więc na termin czasem trzeba poczekać.",
  },
  {
    name: "Agencja",
    example: "zespół specjalistów",
    price: "zwykle od 10 000 zł wzwyż",
    who: "Dla większych firm z rozbudowanymi potrzebami i budżetem.",
    plus: "Duży zespół: projektant, programista, copywriter, specjalista SEO.",
    minus: "Najwyższa cena, a kontakt często idzie przez opiekuna projektu, nie wykonawców.",
  },
];

const running = [
  { item: "Domena .pl", cost: "zwykle kilkadziesiąt do ok. 150 zł rocznie", note: "Pierwszy rok bywa promocyjny, sprawdzaj cenę odnowienia." },
  { item: "Hosting", cost: "od 0 do kilkudziesięciu zł miesięcznie", note: "Zależy od technologii strony i ruchu." },
  { item: "Poczta na domenie", cost: "od kilku do kilkudziesięciu zł miesięcznie za skrzynkę", note: "Adres jan@twojafirma.pl buduje zaufanie bardziej niż Gmail." },
  { item: "Opieka techniczna", cost: "opcjonalnie, od ok. 150 zł miesięcznie", note: "Aktualizacje, kopie zapasowe, drobne zmiany treści." },
];

export default function Page() {
  const post = getPost(SLUG);
  return (
    <article>
      <ArticleJsonLd post={post} />
      <ArticleHeader post={post} />

      <div className="container-site grid gap-12 pb-24 md:grid-cols-12">
        <aside className="hidden md:col-span-3 md:block">
          <div className="sticky top-32">
            <Toc items={toc} />
          </div>
        </aside>

        <Prose className="min-w-0 md:col-span-7 md:col-start-5">
          <Callout title="Krótka odpowiedź" tone="short">
            <p id="krotko" className="scroll-mt-28">
              Profesjonalna strona dla małej, lokalnej firmy to najczęściej wydatek rzędu kilku
              tysięcy złotych jednorazowo i kilkuset złotych rocznie na utrzymanie. Rozpiętość cen
              jest jednak ogromna, od darmowego kreatora po kilkadziesiąt tysięcy w agencji, i
              wbrew pozorom ma uzasadnienie.
            </p>
          </Callout>

          <p>
            „Ile kosztuje strona?” to pytanie, które słyszę najczęściej. I rozumiem, dlaczego
            odpowiedź „to zależy” irytuje. Dlatego w tym wpisie rozkładam cenę na części: pokazuję,
            jakie są drogi do własnej strony, od czego zależy kwota na fakturze i ile kosztuje
            strona już po starcie.
          </p>

          <H2 id="cztery-drogi">Cztery drogi do własnej strony</H2>
          <p>
            Zanim porównasz oferty, warto wiedzieć, że porównujesz często zupełnie różne rzeczy.
            Strona z kreatora i strona zaprojektowana od zera to inne produkty, tak jak garnitur z
            sieciówki i szyty na miarę.
          </p>

          <div className="not-prose my-10 border-t border-ink">
            {paths.map((p, i) => (
              <div key={p.name} className="grid gap-4 border-b border-ink py-8 md:grid-cols-[3rem_1fr]">
                <span className="text-sm font-semibold text-stone">0{i + 1}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="type-heading text-2xl md:text-3xl">{p.name}</h3>
                    <span className="type-heading text-lg text-violet">{p.price}</span>
                  </div>
                  <p className="mt-1 text-[15px] text-stone">{p.example}</p>
                  <p className="mt-4 text-lg">{p.who}</p>
                  <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold">Zalety</dt>
                      <dd className="mt-1 text-stone">{p.plus}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Wady</dt>
                      <dd className="mt-1 text-stone">{p.minus}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>

          <H2 id="co-wplywa-na-cene">Co wpływa na cenę</H2>
          <p>
            Nawet w obrębie jednej drogi ceny potrafią się różnić kilkukrotnie. Oto co faktycznie
            zmienia kwotę:
          </p>
          <ul>
            <li>
              <strong>Liczba podstron.</strong> Jedna strona z sekcjami to inna praca niż osiem
              podstron, z których każda opisuje osobną usługę.
            </li>
            <li>
              <strong>Projekt indywidualny czy szablon.</strong> Projekt od zera wymaga czasu
              projektanta, ale sprawia, że firma nie wygląda jak konkurencja.
            </li>
            <li>
              <strong>Teksty i zdjęcia.</strong> Jeśli masz gotowe materiały, płacisz mniej. Jeśli
              ktoś ma je napisać i dobrać, to dodatkowa praca, często niedoceniana.
            </li>
            <li>
              <strong>Funkcje.</strong> Rezerwacje online, płatności, wiele języków czy panel do
              edycji treści podnoszą cenę, bo każda z nich to osobny kawałek pracy.
            </li>
            <li>
              <strong>Widoczność w Google.</strong> Podstawowe SEO powinno być w cenie każdej
              strony. Rozbudowane działania, jak osobne podstrony pod konkretne frazy, to już
              osobny zakres.
            </li>
          </ul>

          <PullQuote>Najdroższa strona to ta, która nie przynosi klientów.</PullQuote>

          <p>
            Strona za 500 zł, która nie pojawia się w Google i odstrasza wyglądem, kosztuje Cię
            więcej niż dobra strona za kilka tysięcy, bo traci klientów każdego dnia. Dlatego
            zamiast pytać tylko o cenę, zapytaj wykonawcę, co strona ma dla Ciebie zrobić.
          </p>

          <H2 id="utrzymanie">Koszty utrzymania po starcie</H2>
          <p>
            Wiele osób zapomina, że strona to nie tylko jednorazowy wydatek. Oto, co opłacasz
            regularnie:
          </p>

          <div className="not-prose my-10 overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="py-3 pr-4 font-semibold">Co</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Ile, orientacyjnie</th>
                  <th scope="col" className="py-3 font-semibold">Warto wiedzieć</th>
                </tr>
              </thead>
              <tbody>
                {running.map((r) => (
                  <tr key={r.item} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-4 font-semibold">{r.item}</th>
                    <td className="py-4 pr-4">{r.cost}</td>
                    <td className="py-4 text-stone">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H2 id="na-co-uwazac">Na co uważać przy wyborze wykonawcy</H2>
          <ol>
            <li>
              <strong>Domena musi być zarejestrowana na Ciebie.</strong> Jeśli jest na wykonawcę,
              w razie rozstania możesz stracić adres, pod którym znają Cię klienci.
            </li>
            <li>
              <strong>Ustalcie zakres na piśmie.</strong> Liczba podstron, poprawek, termin i to,
              kto przygotowuje teksty, powinny być zapisane w umowie lub wycenie.
            </li>
            <li>
              <strong>Zapytaj o koszty po starcie.</strong> Niska cena na start bywa rekompensowana
              drogim, obowiązkowym abonamentem.
            </li>
            <li>
              <strong>Sprawdź realizacje.</strong> Otwórz strony z portfolio na telefonie. Jeśli
              ładują się wolno albo źle wyglądają, Twoja prawdopodobnie też tak będzie działać.
            </li>
          </ol>

          <Callout title="Uwaga na „strony za darmo”" tone="warning">
            <p>
              Oferty strony za darmo zwykle mają haczyk: wysoki abonament, umowę na kilka lat albo
              domenę, której nie możesz zabrać. Zawsze pytaj, co dzieje się, gdy chcesz zrezygnować.
            </p>
          </Callout>

          <H2 id="u-mnie">Ile kosztuje strona u mnie</H2>
          <p>
            Skoro już mowa o cenach, uczciwie pokazuję swoje. To ceny początkowe, a dokładną wycenę
            podaję po krótkiej, bezpłatnej rozmowie.
          </p>
          <div className="not-prose my-10 grid gap-px bg-line sm:grid-cols-3">
            {packages.map((p) => (
              <div key={p.name} className="bg-paper p-6">
                <p className="font-semibold">{p.name}</p>
                <p className="type-heading mt-3 text-2xl">{p.price}</p>
                <p className="mt-2 text-sm text-stone">{p.time}</p>
              </div>
            ))}
          </div>
          <p>
            Do tego opcjonalna opieka techniczna {care.price}. Szczegóły znajdziesz na stronie{" "}
            <Link href="/oferta">oferty</Link>, a jeśli chcesz konkretną kwotę dla swojej firmy,{" "}
            <Link href="/kontakt">napisz do mnie</Link>.
          </p>
        </Prose>
      </div>

      <PostEnd slug={SLUG} cta="Poproś o wycenę" />
    </article>
  );
}
