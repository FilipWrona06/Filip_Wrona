// Czy link prowadzi do strony, na której właśnie jesteśmy (także jej podstron).
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
