"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// Obrazek z zabezpieczeniem: jeśli się nie wczyta (np. zmienił się adres
// na stronie klienta), zamiast pustego miejsca pokazuje zaślepkę.
export function SafeImage({ fallback, ...props }: ImageProps & { fallback: React.ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} onError={() => setFailed(true)} />;
}
