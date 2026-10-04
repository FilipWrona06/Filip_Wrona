"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { BUDGETS, PROJECT_TYPES } from "@/lib/contact";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Podaj imię, żebym wiedział, jak się zwracać.")
    .max(80, "Imię może mieć maksymalnie 80 znaków."),
  email: z.email("Wpisz poprawny adres e-mail, np. jan@firma.pl.").max(254),
  phone: z
    .string()
    .trim()
    .max(20, "Numer telefonu jest za długi.")
    .regex(/^[+\d\s()-]*$/, "Numer telefonu może zawierać tylko cyfry, spacje i znak +.")
    .optional(),
  type: z.enum(PROJECT_TYPES, { error: "Wybierz rodzaj projektu." }),
  budget: z.enum(BUDGETS, { error: "Wybierz orientacyjny budżet." }),
  message: z
    .string()
    .trim()
    .min(10, "Opisz projekt w kilku zdaniach, to pomoże mi przygotować wycenę.")
    .max(4000, "Wiadomość może mieć maksymalnie 4000 znaków."),
  consent: z.literal("on", { error: "Zaznacz zgodę, żebym mógł odpowiedzieć na wiadomość." }),
});

type Field = keyof z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Record<string, string>;
};

// Prosty limit: maksymalnie 5 wiadomości z jednego adresu IP na 10 minut.
// (Pamięć jednej instancji serwera: chroni przed zalewem wiadomości, nie zastępuje WAF.)
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // zabezpieczenie pamięci
  return recent.length > LIMIT;
}

// Usuwa znaki nowej linii (ochrona nagłówków e-maila przed wstrzyknięciem).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // 1. Pułapka na boty: człowiek nie widzi tego pola. Udajemy sukces, żeby bot nie próbował dalej.
  if (formData.get("website")) return { status: "success" };

  // 2. Formularz wypełniony szybciej niż w 3 sekundy to prawie na pewno bot.
  const elapsed = Number(formData.get("elapsed") ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < 3000) return { status: "success" };

  const fields = ["name", "email", "phone", "type", "budget", "message", "consent"] as const;
  const raw = Object.fromEntries(
    fields.map((k) => {
      const v = formData.get(k);
      return [k, typeof v === "string" && v !== "" ? v : undefined];
    }),
  );
  const values = Object.fromEntries(
    Object.entries(raw).filter(([k, v]) => k !== "consent" && typeof v === "string"),
  ) as Record<string, string>;

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Uzupełnij zaznaczone pola i wyślij ponownie.", errors, values };
  }

  // 3. Limit wiadomości z jednego adresu IP.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "nieznany";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Wysłano już kilka wiadomości. Spróbuj ponownie za kilka minut albo napisz bezpośrednio na e-mail.",
      values,
    };
  }

  const d = parsed.data;
  const text = [
    `Imię: ${d.name}`,
    `E-mail: ${d.email}`,
    `Telefon: ${d.phone || "nie podano"}`,
    `Rodzaj projektu: ${d.type}`,
    `Budżet: ${d.budget}`,
    "",
    d.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // Tryb deweloperski: bez klucza wiadomość trafia tylko do konsoli.
      console.log("[formularz] Brak RESEND_API_KEY, treść zapytania:\n" + text);
      return { status: "success" };
    }
    // Na produkcji nie zapisujemy danych osobowych w logach.
    console.error("[formularz] Brak RESEND_API_KEY: formularz nie wysyła wiadomości.");
    return {
      status: "error",
      message: "Formularz chwilowo nie działa. Napisz proszę bezpośrednio na adres e-mail podany obok.",
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Formularz <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "kontakt@filipwrona.pl",
      replyTo: d.email,
      subject: `Nowe zapytanie: ${oneLine(d.name)} (${d.type})`,
      text,
    });
    if (error) throw error;
    return { status: "success" };
  } catch {
    console.error("[formularz] Błąd wysyłki wiadomości przez Resend.");
    return {
      status: "error",
      message: "Wiadomość nie została wysłana z powodu błędu serwera. Napisz bezpośrednio na kontakt@filipwrona.pl.",
      values,
    };
  }
}
