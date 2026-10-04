"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/kontakt/actions";
import { BUDGETS as budgets, PROJECT_TYPES as types } from "@/lib/contact";
import { site } from "@/lib/site";

const initial: ContactState = { status: "idle" };

function Field({
  label,
  name,
  error,
  children,
  hint,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[15px] font-semibold">
        {label}
        {hint && <span className="ml-2 font-normal text-stone">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm font-medium text-ink underline decoration-1 underline-offset-4">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-smoke focus:border-ink focus-visible:outline-none aria-[invalid=true]:border-ink";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  // Czas od wyświetlenia formularza (boty wysyłają go natychmiast).
  // Pole aktualizuje się samo, więc ma poprawną wartość niezależnie od sposobu wysyłki.
  const elapsedRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const shownAt = Date.now();
    const id = window.setInterval(() => {
      if (elapsedRef.current) elapsedRef.current.value = String(Date.now() - shownAt);
    }, 500);
    return () => window.clearInterval(id);
  }, []);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="fade-in flex min-h-[28rem] flex-col justify-center" role="status">
        <p className="type-heading text-4xl md:text-5xl">Wiadomość wysłana.</p>
        <p className="mt-4 max-w-[40ch] text-lg text-stone">
          Odpowiem w ciągu jednego dnia roboczego. Jeśli sprawa jest pilna, zadzwoń.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-8 md:grid-cols-2">
      <input ref={elapsedRef} type="hidden" name="elapsed" defaultValue="0" />
      <div className="hidden" aria-hidden>
        <label>
          Strona www
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Imię" name="name" error={e.name}>
        <input
          id="name"
          name="name"
          autoComplete="given-name"
          maxLength={80}
          defaultValue={v.name}
          aria-invalid={!!e.name}
          aria-describedby={e.name ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field label="E-mail" name="email" error={e.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          inputMode="email"
          defaultValue={v.email}
          aria-invalid={!!e.email}
          aria-describedby={e.email ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field label="Telefon" name="phone" hint="opcjonalnie" error={e.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={20}
          inputMode="tel"
          aria-invalid={!!e.phone}
          aria-describedby={e.phone ? "phone-error" : undefined}
          defaultValue={v.phone}
          className={inputClass}
        />
      </Field>
      <Field label="Rodzaj projektu" name="type" error={e.type}>
        <select
          id="type"
          name="type"
          defaultValue={v.type ?? ""}
          aria-invalid={!!e.type}
          className={inputClass}
        >
          <option value="" disabled>
            Wybierz
          </option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <fieldset className="md:col-span-2">
        <legend className="mb-3 text-[15px] font-semibold">Orientacyjny budżet</legend>
        <div className="flex flex-wrap gap-3">
          {budgets.map((b) => (
            <label key={b} className="relative">
              <input
                type="radio"
                name="budget"
                value={b}
                defaultChecked={v.budget === b}
                className="peer sr-only"
              />
              <span className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[15px] transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 hover:border-ink">
                {b}
              </span>
            </label>
          ))}
        </div>
        {e.budget && (
          <p className="mt-2 text-sm font-medium underline decoration-1 underline-offset-4">
            {e.budget}
          </p>
        )}
      </fieldset>

      <div className="md:col-span-2">
        <Field label="Opowiedz o projekcie" name="message" error={e.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={4000}
            defaultValue={v.message}
            placeholder="Czym zajmuje się Twoja firma i czego oczekujesz od strony?"
            aria-invalid={!!e.message}
            aria-describedby={e.message ? "message-error" : undefined}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-[15px] text-stone">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 shrink-0 accent-black"
            aria-invalid={!!e.consent}
          />
          <span>
            Zgadzam się na przetwarzanie moich danych w celu odpowiedzi na wiadomość i przygotowania
            wyceny. Administratorem danych jest {site.name}. Zgodę możesz wycofać w każdej chwili.
            Szczegóły w{" "}
            <Link href="/polityka-prywatnosci" className="text-ink underline underline-offset-4">
              polityce prywatności
            </Link>
            .
          </span>
        </label>
        {e.consent && (
          <p className="mt-2 text-sm font-medium underline decoration-1 underline-offset-4">
            {e.consent}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-16 items-center justify-center rounded-full bg-ink px-10 text-[17px] font-semibold text-paper transition-[transform,opacity] active:scale-[0.97] disabled:opacity-60"
        >
          {pending ? "Wysyłanie…" : "Wyślij wiadomość"}
        </button>
        {state.status === "error" && state.message && (
          <p role="alert" className="fade-in max-w-[44ch] text-[15px]">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
