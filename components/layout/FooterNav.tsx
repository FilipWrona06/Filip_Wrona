"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { isActivePath } from "@/lib/nav";

// Linki do podstron w stopce. Bieżąca strona jest zaznaczona fioletową kreską i kolorem.
export function FooterNav() {
  const pathname = usePathname();
  const items = [{ label: "Strona główna", href: "/" }, ...site.nav, { label: "Kontakt", href: "/kontakt" }];
  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group inline-flex items-center gap-3 transition-colors duration-300 ${
                active ? "text-[#b3a4ff]" : "text-paper hover:text-[#b3a4ff]"
              }`}
            >
              <span
                aria-hidden
                className={`h-px w-5 origin-left bg-violet transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-60"
                }`}
              />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
