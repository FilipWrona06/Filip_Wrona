// Polska typografia: jednoliterowe słowa (w, z, i, a, o, u) nie zostają na końcu linii.
export function noOrphans(text: string) {
  return text.replace(/(^|\s)([wzioauWZIOAU])\s+/g, "$1$2\u00A0");
}
