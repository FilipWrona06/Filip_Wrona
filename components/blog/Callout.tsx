// Ramka z poradą lub ostrzeżeniem. Lewa krawędź to pociągnięcie pędzlem.
export function Callout({
  title,
  children,
  tone = "tip",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "tip" | "warning" | "short";
}) {
  const accent = tone === "warning" ? "bg-ink" : "bg-violet";
  return (
    <aside className="not-prose relative my-10 bg-mist py-6 pr-6 pl-8 md:py-8 md:pr-10 md:pl-11">
      <span aria-hidden className={`absolute top-3 bottom-3 left-0 w-[3px] rounded-full ${accent}`} />
      <p className="text-[15px] font-semibold">{title}</p>
      <div className="mt-2 text-lg leading-relaxed text-ink/80 [&_p+p]:mt-3">{children}</div>
    </aside>
  );
}
