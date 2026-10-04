import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

type Props = {
  href: string;
  children: string;
  variant?: "dark" | "light" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
};

const variants = {
  dark: { base: "bg-ink text-paper", fill: "bg-violet", hoverText: "" },
  light: { base: "bg-paper text-ink", fill: "bg-violet", hoverText: "group-hover:text-paper" },
  outline: {
    base: "border border-current text-current",
    fill: "bg-ink",
    hoverText: "group-hover:text-paper",
  },
};
const sizes = {
  sm: "h-10 px-5 text-[14px]",
  md: "h-13 px-7 text-[15px]",
  lg: "h-16 px-9 text-[17px]",
};

// Przycisk: po najechaniu tło wypełnia się od dołu (fiolet albo czerń),
// napis wyjeżdża w górę, a jego kopia wjeżdża od dołu. Do tego lekkie
// przyciąganie do kursora.
export function ButtonLink({
  href,
  children,
  variant = "dark",
  size = "md",
  external,
  className = "",
}: Props) {
  const v = variants[variant];
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${v.fill}`}
      />
      <span className={`relative block overflow-hidden transition-colors duration-300 ${v.hoverText}`}>
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </>
  );
  const classes = `group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[transform,border-color] active:scale-[0.97] ${v.base} ${sizes[size]} ${variant === "outline" ? "hover:border-ink" : ""} ${className}`;

  return (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
