// Nieskończenie przewijany pasek. Czysty CSS, zatrzymuje się po najechaniu.
export function Marquee({
  items,
  duration = 40,
  className = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-[0.4em]">{item}</span>
          <span className="inline-block h-[0.18em] w-[0.18em] rounded-full bg-current" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
