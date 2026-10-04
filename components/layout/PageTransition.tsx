"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { routeLabel } from "@/lib/routes";
import { Enso } from "@/components/ui/Enso";

type Phase = "idle" | "cover" | "covered" | "reveal";
const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Przejście między podstronami: czarna kurtyna wjeżdża od dołu, nazwa
 * docelowej podstrony „rozpręża się” na środku, a po załadowaniu nowej
 * strony kurtyna odjeżdża do góry. Działa automatycznie dla wszystkich
 * wewnętrznych linków, bez zmian w komponentach.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const start = useCallback((href: string) => {
    target.current = href;
    setLabel(routeLabel(new URL(href, location.origin).pathname));
    setPhase("cover");
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // ta sama strona lub kotwica
      if (phaseRef.current !== "idle") {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      start(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  // Nowa strona się wyrenderowała: odsłaniamy ją.
  useEffect(() => {
    if (phaseRef.current !== "covered") return;
    const t = setTimeout(() => setPhase("reveal"), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  // Zabezpieczenie: gdyby nawigacja się nie powiodła, kurtyna i tak zniknie.
  useEffect(() => {
    if (phase !== "covered") return;
    const t = setTimeout(() => setPhase("reveal"), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  const visible = phase !== "idle";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          aria-hidden
          className="fixed inset-0 z-[80] flex flex-col justify-end bg-ink text-paper"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={
            phase === "reveal"
              ? { clipPath: "inset(0% 0% 100% 0%)" }
              : { clipPath: "inset(0% 0% 0% 0%)" }
          }
          transition={{ duration: phase === "reveal" ? 0.75 : 0.6, ease }}
          onAnimationComplete={() => {
            if (phaseRef.current === "cover" && target.current) {
              setPhase("covered");
              router.push(target.current);
            } else if (phaseRef.current === "reveal") {
              setPhase("idle");
              target.current = null;
            }
          }}
        >
          <Enso
            key={`enso-${label}`}
            duration={0.85}
            className="absolute top-1/2 right-[8vw] h-[clamp(140px,26vw,360px)] w-[clamp(140px,26vw,360px)] -translate-y-[60%] text-violet"
          />
          <div className="container-site relative pb-14 md:pb-20">
            <p
              key={label}
              className="stretch-in block leading-[0.9] font-extrabold"
              style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
            >
              {label}
            </p>
            <motion.div
              className="mt-6 h-px origin-left bg-violet"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "cover" ? 0.6 : 1 }}
              transition={{ duration: phase === "cover" ? 0.6 : 0.4, ease }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
