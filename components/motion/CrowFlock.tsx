"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { MotionValue } from "motion/react";

type Bird = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number; // miejsce w literze
  hy: number;
  s: number; // rozpiętość skrzydeł
  phase: number; // faza machania
  delay: number; // opóźnienie przylotu (ms)
  takeoff: number; // przy jakim postępie scrolla wrona odlatuje
  ox: number; // kierunek odlotu
  oy: number;
  startle: number; // jak bardzo jest spłoszona (0–1)
  flutter: number; // losowe poruszenie skrzydłami w spoczynku
  seed: number;
};

// Czerń piór i ich fioletowy połysk w ruchu
const COLORS = ["#141312", "#3a2a96", "#6b4eff"];
// Rodzina fontu z next/font (nazwa jest generowana przy budowaniu, więc czytamy ją ze zmiennej CSS)
const fontFamily = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--font-archivo").trim() ||
  "Arial, sans-serif";

type Props = {
  text: string;
  /** element, na którym leży płótno (wrony mogą latać po całym jego obszarze) */
  containerRef: RefObject<HTMLElement | null>;
  /** element wyznaczający miejsce i rozmiar napisu */
  boxRef: RefObject<HTMLElement | null>;
  /** postęp przewijania sekcji (0–1): wrony po kolei odlatują */
  progress?: MotionValue<number>;
};

/**
 * Napis zbudowany ze stada wron. Ptaki przylatują i układają się w litery,
 * płoszą się przed kursorem i kliknięciem, a przy przewijaniu odlatują.
 * W ruchu ich pióra połyskują fioletem, w spoczynku są czarne.
 */
export function CrowFlock({ text, containerRef, boxRef, progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const box = boxRef.current;
    if (!canvas || !container || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let birds: Bird[] = [];
    let W = 0;
    let H = 0;
    let dpr = 1;
    let step = 6;
    let raf = 0;
    let last = 0;
    let visible = true;
    let ready = false;
    let firstSample = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, active: false };
    // Telefony: lżejszy tryb (rozdzielczość 1×, 30 kl./s, prostszy kształt, krótszy przylot)
    const lite = window.matchMedia("(max-width: 639px), (pointer: coarse)").matches;
    const frameGap = lite ? 1000 / 30 - 2 : 0;
    // Kiedy ostatnio coś się działo (ruch kursora, kliknięcie, przewijanie).
    // Gdy przez chwilę nic się nie dzieje i wrony usiądą, animacja całkowicie się zatrzymuje.
    let lastActivity = performance.now();
    let energy = 1;

    const makeBird = (hx: number, hy: number, intro: boolean): Bird => ({
      x: intro ? W + 40 + Math.random() * W * 0.5 : hx,
      y: intro ? -60 + Math.random() * H * 0.6 : hy,
      vx: intro ? -5 - Math.random() * 4 : 0,
      vy: intro ? Math.random() * 3 - 0.5 : 0,
      hx,
      hy,
      s: step * (0.36 + Math.random() * 0.12),
      phase: Math.random() * Math.PI * 2,
      delay: intro ? 150 + Math.random() * (lite ? 500 : 1100) : 0,
      takeoff: 0.04 + Math.random() * 0.5,
      ox: -200 + Math.random() * 800,
      oy: 150 + Math.random() * 500,
      startle: intro ? 1 : 0,
      flutter: 0,
      seed: Math.random() * Math.PI * 2,
    });

    // Rysuje napis poza ekranem i zamienia jego piksele na miejsca dla wron.
    const sample = () => {
      const cr = container.getBoundingClientRect();
      const br = box.getBoundingClientRect();
      W = cr.width;
      H = cr.height;
      dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const bx = br.left - cr.left;
      const by = br.top - cr.top;
      const bw = Math.max(1, br.width);
      const bh = Math.max(1, br.height);
      step = bw < 520 ? 6.4 : bw < 900 ? 7.6 : bw < 1300 ? 8.6 : 9.6;

      const off = document.createElement("canvas");
      off.width = Math.ceil(bw);
      off.height = Math.ceil(bh);
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      if ("fontStretch" in o) (o as { fontStretch: string }).fontStretch = "expanded";
      // Wąskie, wysokie pole (telefon): każde słowo w osobnej linii
      const lines = bh / bw > 0.28 ? text.split(" ") : [text];
      o.font = `800 100px ${fontFamily()}`;
      const metrics = lines.map((l) => o.measureText(l));
      const widest = Math.max(...metrics.map((m) => m.width));
      const asc100 = Math.max(...metrics.map((m) => m.actualBoundingBoxAscent));
      const desc100 = Math.max(...metrics.map((m) => m.actualBoundingBoxDescent));
      const lineGap = 0.1 * 100;
      const blockH100 = lines.length * (asc100 + desc100) + (lines.length - 1) * lineGap;
      const size = Math.min(((bw * 0.995) / widest) * 100, ((bh * 0.98) / blockH100) * 100);
      const k = size / 100;
      o.font = `800 ${size}px ${fontFamily()}`;
      o.fillStyle = "#000";
      const blockH = blockH100 * k;
      let y0 = (bh - blockH) / 2;
      for (const line of lines) {
        const m = o.measureText(line);
        o.fillText(line, -m.actualBoundingBoxLeft, y0 + asc100 * k);
        y0 += (asc100 + desc100 + lineGap) * k;
      }

      const data = o.getImageData(0, 0, off.width, off.height).data;
      const points: [number, number][] = [];
      for (let y = step / 2; y < off.height; y += step) {
        for (let x = step / 2; x < off.width; x += step) {
          const jx = x + (Math.random() - 0.5) * step * 0.5;
          const jy = y + (Math.random() - 0.5) * step * 0.5;
          const i = (Math.floor(jy) * off.width + Math.floor(jx)) * 4 + 3;
          if (data[i] > 140) points.push([bx + jx, by + jy]);
        }
      }
      // tasujemy, żeby stado układało się w litery „naturalnie”, a nie rzędami
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [points[i], points[j]] = [points[j], points[i]];
      }

      const intro = firstSample;
      const next: Bird[] = points.map(([hx, hy], i) => {
        const b = birds[i];
        if (b) {
          b.hx = hx;
          b.hy = hy;
          b.s = step * (0.36 + Math.random() * 0.12);
          return b;
        }
        return makeBird(hx, hy, intro);
      });
      birds = next;
      firstSample = false;
    };

    const update = (dt: number, now: number) => {
      const p = progress?.get() ?? 0;
      const resting = now - lastActivity > 2500 && now - start > 5500;
      energy = 0;
      const R = Math.max(80, Math.min(W, 1600) * 0.075);
      const maxSpeed = 10;

      for (const b of birds) {
        if (now - start < b.delay) continue;
        const away = p > b.takeoff;
        let tx = b.hx;
        let ty = b.hy;
        if (away) {
          tx = b.hx + b.ox;
          ty = b.hy - H * 0.7 - b.oy;
        }
        const dx = tx - b.x;
        const dy = ty - b.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const sp = d < 140 ? maxSpeed * (d / 140) : maxSpeed;
        let ax = (dx / d) * sp - b.vx;
        let ay = (dy / d) * sp - b.vy;
        const fl = Math.hypot(ax, ay);
        const maxForce = away ? 0.3 : 0.55;
        if (fl > maxForce) {
          ax *= maxForce / fl;
          ay *= maxForce / fl;
        }
        if (d > 25) {
          ax += Math.sin(now * 0.0021 + b.seed) * 0.14;
          ay += Math.cos(now * 0.0017 + b.seed * 1.3) * 0.14;
        }
        if (pointer.active) {
          const ex = b.x - pointer.x;
          const ey = b.y - pointer.y;
          const e = Math.hypot(ex, ey);
          if (e < R && e > 0.01) {
            const f = 1 - e / R;
            ax += (ex / e) * f * 2.4;
            ay += (ey / e) * f * 2.4 - f * 0.9;
            b.startle = Math.min(1, b.startle + f * 0.5);
          }
        }
        const drag = 1 - 0.045 * dt;
        b.vx = (b.vx + ax * dt) * drag;
        b.vy = (b.vy + ay * dt) * drag;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.startle *= Math.pow(0.975, dt);
        b.flutter *= Math.pow(0.95, dt);
        // pojedyncze wrony czasem poruszą skrzydłami, ale tylko gdy strona „żyje”
        if (!resting && Math.random() < 0.0005 * dt) b.flutter = 1;
        const speed = Math.hypot(b.vx, b.vy);
        const e = speed + b.startle + b.flutter + (away ? 1 : Math.min(1, Math.hypot(b.hx - b.x, b.hy - b.y) / 4));
        if (e > energy) energy = e;
        b.phase += (0.07 + speed * 0.05 + b.startle * 0.38 + b.flutter * 0.32) * dt;
      }
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // 3 kolory × 2 grubości kreski (jak różny nacisk pędzla)
      const widths = W < 640 ? [0.9, 1.5] : [1.2, 2.1];
      const paths = Array.from({ length: 6 }, () => new Path2D());

      for (const b of birds) {
        if (now - start < b.delay) continue;
        if (b.x < -40 || b.x > W + 40 || b.y < -40 || b.y > H + 40) continue;
        const speed = Math.hypot(b.vx, b.vy);
        const flap = Math.min(1, speed / 3.5 + b.startle + b.flutter);
        const wing = Math.sin(b.phase);
        // Sylwetka ptaka: dwa łuki skrzydeł spotykające się w dołku.
        // W spoczynku skrzydła uniesione, w locie machają góra-dół.
        const h = b.s * (1.05 * (1 - flap) + flap * (-0.25 + 1.5 * (0.5 + 0.5 * wing)));
        // każda wrona lekko inaczej przechylona, żeby stado wyglądało naturalnie
        let rot = Math.sin(b.seed * 3.7) * 0.22 + Math.max(-0.5, Math.min(0.5, b.vx * 0.04));
        if (speed > 0.6) rot += Math.atan2(b.vy, Math.abs(b.vx) + 0.001) * 0.2;
        const c = Math.cos(rot);
        const sn = Math.sin(rot);
        const sz = b.s;
        // punkty lokalne -> obrót -> pozycja
        const tx = (lx: number, ly: number) => b.x + lx * c - ly * sn;
        const ty = (lx: number, ly: number) => b.y + lx * sn + ly * c;
        const tipY = -h * 0.7;
        const ctrlY = -h * 1.15;
        const sheen =
          Math.min(1, (speed / maxSpeedFor(W)) * 0.9 + b.startle * 0.85 + b.flutter * 0.45) *
          (0.55 + 0.45 * Math.sin(b.phase * 0.5 + b.seed));
        const k = sheen < 0.28 ? 0 : sheen < 0.58 ? 1 : 2;
        const path = paths[k * 2 + (b.seed > Math.PI ? 1 : 0)];
        path.moveTo(tx(-sz, tipY), ty(-sz, tipY));
        if (lite) {
          // na małym ekranie różnicy nie widać, a linie proste są tańsze od krzywych
          path.lineTo(tx(-sz * 0.4, ctrlY), ty(-sz * 0.4, ctrlY));
          path.lineTo(b.x, b.y);
          path.lineTo(tx(sz * 0.4, ctrlY), ty(sz * 0.4, ctrlY));
          path.lineTo(tx(sz, tipY), ty(sz, tipY));
        } else {
          path.quadraticCurveTo(tx(-sz * 0.45, ctrlY), ty(-sz * 0.45, ctrlY), b.x, b.y);
          path.quadraticCurveTo(tx(sz * 0.45, ctrlY), ty(sz * 0.45, ctrlY), tx(sz, tipY), ty(sz, tipY));
        }
      }

      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = COLORS[i >> 1];
        ctx.lineWidth = widths[i & 1];
        ctx.stroke(paths[i]);
      }
    };

    const tick = (now: number) => {
      if (frameGap && last && now - last < frameGap) {
        raf = visible ? requestAnimationFrame(tick) : 0;
        return;
      }
      const dt = Math.min(3, (now - (last || now)) / 16.667) || 1;
      last = now;
      update(dt, now);
      draw(now);
      // wszystkie wrony siedzą i nic się nie dzieje: zatrzymujemy animację (zero pracy procesora)
      const asleep = now - lastActivity > 2500 && now - start > 5500 && energy < 0.03;
      raf = visible && !asleep ? requestAnimationFrame(tick) : 0;
    };

    const run = () => {
      if (!ready) return;
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    // Interakcja: kursor płoszy, kliknięcie/dotknięcie płoszy mocniej
    const wake = () => {
      lastActivity = performance.now();
      run();
    };
    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const wasActive = pointer.active;
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height;
      if (pointer.active || wasActive) wake();
    };
    const onLeave = () => {
      pointer.active = false;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, select")) return;
      wake();
      const r = container.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      const R = Math.max(160, Math.min(W, 1600) * 0.2);
      for (const b of birds) {
        const ex = b.x - px;
        const ey = b.y - py;
        const d = Math.hypot(ex, ey);
        if (d < R && d > 0.01) {
          const f = 1 - d / R;
          b.vx += (ex / d) * f * 16 + (Math.random() - 0.5) * 4;
          b.vy += (ey / d) * f * 16 - Math.random() * 9 * f;
          b.startle = 1;
        }
      }
      if (e.pointerType !== "mouse") {
        pointer.active = false;
      }
    };

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      if (!ready) return;
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        sample();
        wake();
      });
    });
    ro.observe(container);
    ro.observe(box);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
    });
    io.observe(container);

    window.addEventListener("pointermove", onMove, { passive: true });
    const unsubscribeScroll = progress?.on("change", wake);
    document.documentElement.addEventListener("pointerleave", onLeave);
    container.addEventListener("pointerdown", onDown);

    const fontsReady = document.fonts
      ? document.fonts.load(`800 100px ${fontFamily()}`).catch(() => undefined)
      : Promise.resolve();
    let cancelled = false;
    // Start dopiero, gdy przeglądarka skończy ładować stronę i ma wolną chwilę:
    // stado nie konkuruje z uruchamianiem strony (lepsze wyniki wydajności).
    const whenIdle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(cb, { timeout: 600 })
        : globalThis.setTimeout(cb, 120);
    fontsReady.then(() =>
      whenIdle(() => {
        if (cancelled) return;
        ready = true;
        sample();
        run();
      }),
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("pointerdown", onDown);
      unsubscribeScroll?.();
    };
  }, [text, containerRef, boxRef, progress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-0"
    />
  );
}

function maxSpeedFor(width: number) {
  return width < 640 ? 8 : 10;
}
