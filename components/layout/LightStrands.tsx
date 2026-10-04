"use client";

import { useEffect, useRef } from "react";

/*
 * Tło: delikatne, świecące fioletowe pasma, które same powoli zmieniają formy:
 *   jedno pasmo → rozdziela się na wiele → splata w warkocz → zwija w małe,
 *   niedomknięte kółko (ensō) → rozpada się na drobinki → składa z powrotem w jedno pasmo.
 * Ruch jest wolny i blady, żeby nie przeszkadzał w czytaniu.
 * Rysowane na jednym płótnie (canvas), bez przeliczania układu strony.
 */

type State = "single" | "split" | "braid" | "circle" | "scatter";

const TIMELINE: { state: State; dur: number }[] = [
  { state: "single", dur: 8 },
  { state: "split", dur: 8 },
  { state: "braid", dur: 8 },
  { state: "circle", dur: 7 },
  { state: "scatter", dur: 5 },
];
const MORPH = 3.2; // ile sekund trwa przejście między formami
const CYCLE = TIMELINE.reduce((a, s) => a + s.dur, 0);

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function LightStrands() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let K = 9; // liczba pasm
    const M = 90; // punktów na pasmo
    let rx: Float32Array, ry: Float32Array, rs: Float32Array;

    const seedRandom = () => {
      const n = K * M;
      rx = new Float32Array(n);
      ry = new Float32Array(n);
      rs = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        rx[i] = Math.cos(a);
        ry[i] = Math.sin(a);
        rs[i] = 0.4 + Math.random();
      }
    };

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const nextK = W < 640 ? 6 : 9;
      if (nextK !== K || !rx) {
        K = nextK;
        seedRandom();
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pozycja punktu (u: 0–1 wzdłuż pasma, k: numer pasma) w danej formie.
    const pos = (
      state: State,
      u: number,
      k: number,
      i: number,
      t: number,
      local: number,
      cycle: number,
    ): [number, number] => {
      const kf = K > 1 ? k / (K - 1) - 0.5 : 0;
      const x = -0.06 * W + u * 1.12 * W;
      switch (state) {
        case "single": {
          const y =
            H * 0.64 + Math.sin(u * 6 + t * 0.45) * H * 0.055 + Math.sin(u * 13 + t * 0.8) * H * 0.008;
          return [x, y + kf * 1.6];
        }
        case "split": {
          const spread = Math.pow(Math.sin(u * Math.PI), 1.4) * H * 0.3;
          const y = H * 0.56 + kf * spread + Math.sin(u * 5 + t * 0.45 + kf * 1.6) * H * 0.045;
          return [x, y];
        }
        case "braid": {
          const phase = (k / K) * Math.PI * 2;
          const env = 0.35 + 0.65 * Math.sin(u * Math.PI);
          const y = H * 0.6 + Math.sin(u * 15 + t * 0.6 + phase) * H * 0.06 * env;
          return [x, y];
        }
        case "circle":
        case "scatter": {
          const left = cycle % 2 === 1;
          const cx = W * (left ? 0.2 : 0.8);
          const cy = H * (left ? 0.68 : 0.32);
          const r = Math.min(W, H) * (W < 640 ? 0.16 : 0.11) + kf * 22;
          const ang = -Math.PI / 2 + u * Math.PI * 2 * 0.93 + t * 0.12;
          let px = cx + Math.cos(ang) * r;
          let py = cy + Math.sin(ang) * r;
          if (state === "scatter") {
            const d = (6 + local * 42) * rs[i];
            px += rx[i] * d;
            py += ry[i] * d + local * 9;
          }
          return [px, py];
        }
      }
    };

    const start = performance.now();
    let raf = 0;
    let running = true;
    const xs = new Float32Array(M);
    const ys = new Float32Array(M);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const t = (now - start) / 1000;
      const cycle = Math.floor(t / CYCLE);
      let tc = t % CYCLE;
      let idx = 0;
      while (tc > TIMELINE[idx].dur) {
        tc -= TIMELINE[idx].dur;
        idx++;
      }
      const cur = TIMELINE[idx];
      const prevIdx = (idx + TIMELINE.length - 1) % TIMELINE.length;
      const prev = TIMELINE[prevIdx];
      const prevCycle = idx === 0 ? cycle - 1 : cycle;
      const m = ease(Math.min(1, tc / MORPH));
      // „liniowość”: pasma są liniami, drobinki punktami
      const lineCur = cur.state === "scatter" ? 0 : 1;
      const linePrev = prev.state === "scatter" ? 0 : 1;
      const lineness = linePrev + (lineCur - linePrev) * m;
      const scatterFade = cur.state === "scatter" ? 1 - Math.max(0, (tc - 1.5) / (cur.dur - 1.5)) * 0.85 : 1;
      // gdy pasma nakładają się w jedno, każde z osobna jest bledsze (żeby razem nie było grube)
      const collapsedCur = cur.state === "single" ? 1 : 0;
      const collapsedPrev = prev.state === "single" ? 1 : 0;
      const collapsed = collapsedPrev + (collapsedCur - collapsedPrev) * m;
      const strandAlpha = 1 - collapsed * (1 - 2 / K);
      const fadeIn = Math.min(1, (now - start) / 2500);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let k = 0; k < K; k++) {
        for (let j = 0; j < M; j++) {
          const u = j / (M - 1);
          const i = k * M + j;
          const [ax, ay] = pos(prev.state, u, k, i, t, prev.dur, prevCycle);
          const [bx, by] = pos(cur.state, u, k, i, t, tc, cycle);
          xs[j] = ax + (bx - ax) * m;
          ys[j] = ay + (by - ay) * m;
        }

        if (lineness > 0.01) {
          const path = new Path2D();
          path.moveTo(xs[0], ys[0]);
          for (let j = 1; j < M - 1; j++) {
            const mx = (xs[j] + xs[j + 1]) / 2;
            const my = (ys[j] + ys[j + 1]) / 2;
            path.quadraticCurveTo(xs[j], ys[j], mx, my);
          }
          path.lineTo(xs[M - 1], ys[M - 1]);
          const a = lineness * fadeIn * strandAlpha;
          // poświata (szersza, bardzo blada) + świecący rdzeń
          ctx.strokeStyle = `rgba(124, 98, 255, ${0.05 * a})`;
          ctx.lineWidth = 7;
          ctx.stroke(path);
          ctx.strokeStyle = `rgba(124, 98, 255, ${0.28 * a})`;
          ctx.lineWidth = 1.1;
          ctx.stroke(path);
        }

        const dots = (1 - lineness) * scatterFade * fadeIn;
        if (dots > 0.01) {
          ctx.fillStyle = `rgba(124, 98, 255, ${0.6 * dots})`;
          for (let j = 0; j < M; j++) ctx.fillRect(xs[j] - 1.1, ys[j] - 1.1, 2.2, 2.2);
        }
      }
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
