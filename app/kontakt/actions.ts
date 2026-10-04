"use server";

import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię, żebym wiedział, jak się zwracać."),
  email: z.email("Wpisz poprawny adres e-mail, np. jan@firma.pl."),
  phone: z.string().trim().max(30).optional(),
  type: z.string().min(1, "Wybierz rodzaj projektu."),
  budget: z.string().min(1, "Wybierz orientacyjny budżet."),
  message: z
    .string()
    .trim()
    .min(10, "Opisz projekt w kilku zdaniach, to pomoże mi przygotować wycenę."),
  consent: z.literal("on", { error: "Zaznacz zgodę, żebym mógł odpowiedzieć na wiadomość." }),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
  values?: Record<string, string>;
};

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Pułapka na boty: prawdziwy człowiek nie widzi tego pola.
  if (formData.get("website")) return { status: "success" };

  const raw = Object.fromEntries(
    ["name", "email", "phone", "type", "budget", "message", "consent"].map((k) => [
      k,
      (formData.get(k) as string | null) ?? undefined,
    ]),
  );
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      errors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Uzupełnij zaznaczone pola i wyślij ponownie.",
      errors,
      values: Object.fromEntries(
        Object.entries(raw).filter(([k, v]) => k !== "consent" && typeof v === "string"),
      ) as Record<string, string>,
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
    // Tryb deweloperski: bez klucza wiadomość trafia tylko do konsoli.
    console.log("[formularz] Brak RESEND_API_KEY, treść zapytania:\n" + text);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Formularz <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "kontakt@filipwrona.pl",
      replyTo: d.email,
      subject: `Nowe zapytanie: ${d.name} (${d.type})`,
      text,
    });
    if (error) throw error;
    return { status: "success" };
  } catch (err) {
    console.error("[formularz] Błąd wysyłki", err);
    return {
      status: "error",
      message:
        "Wiadomość nie została wysłana z powodu błędu serwera. Napisz bezpośrednio na kontakt@filipwrona.pl.",
      values: raw as Record<string, string>,
    };
  }
}
