// Typografia tekstu artykułu (akapity, nagłówki, listy, linki, pogrubienia).
// Style są w app/globals.css pod klasą .prose-wrona.
export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`prose-wrona ${className}`}>{children}</div>;
}

// Nagłówek sekcji z kotwicą, do którego prowadzi spis treści.
export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group">
      {children}
      <span className="not-prose">
        <a
          href={`#${id}`}
          aria-label="Link do tej sekcji"
          className="ml-3 text-violet no-underline opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          #
        </a>
      </span>
    </h2>
  );
}
