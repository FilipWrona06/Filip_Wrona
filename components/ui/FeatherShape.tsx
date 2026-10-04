// Sylwetka wroniego pióra (używana w nagłówkach podstron i w tle strony).
export function FeatherShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 40" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M6 2 C10 8 11 18 9.2 29 C8.4 33 7.2 36.5 6 39.5 C5 35.5 3.4 31.5 2.8 25.5 C1.8 16 3 7.5 6 2 Z"
      />
      <path d="M6 4 L6 39.5" stroke="var(--color-paper)" strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}
