/*
 * Tło strony: statyczna faktura papieru (washi) przypięta pod treścią.
 * Bez JavaScriptu: warstwa jest malowana raz, a przy przewijaniu tylko składana.
 * Przypięta (sticky) wewnątrz <main>, więc kończy się razem z treścią
 * i nigdy nie nachodzi na stopkę.
 */
export function ScrollBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="paper-layer sticky top-0 h-screen w-full [height:100lvh]" />
    </div>
  );
}
