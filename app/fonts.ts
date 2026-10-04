import localFont from "next/font/local";

/**
 * Archivo (font zmienny: grubość 100–900, szerokość 62–125%), przycięty do znaków
 * polskiej strony: 82 KB w jednym pliku zamiast ~176 KB w dwóch.
 * next/font sam dodaje wczytywanie z wyprzedzeniem (preload) i zapasowy krój
 * o dopasowanych proporcjach, więc tekst nie „skacze”, gdy font się wczyta.
 */
export const archivo = localFont({
  src: "./fonts/archivo-pl.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  preload: true,
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
