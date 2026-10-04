// Znak marki: sylwetka wrony w locie. Po najechaniu na logo macha skrzydłami.
export function CrowMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 14" aria-hidden className={`overflow-visible ${className}`}>
      <path
        d="M1.5 2.5 C5 2.5 8.5 5.5 12 11 C15.5 5.5 19 2.5 22.5 2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="crow-wings"
      />
    </svg>
  );
}
