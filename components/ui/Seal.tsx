import { seeded } from "@/lib/random";

// Kształt pieczęci liczony raz (bez filtrów SVG, które są kosztowne przy
// każdym przemalowaniu): kwadrat o lekko poszarpanych brzegach.
function roughSquare(seed: number) {
  const rnd = seeded(seed);
  const pts: string[] = [];
  const corners = [
    [5, 5],
    [43, 4.4],
    [43.6, 43.4],
    [4.6, 43.8],
  ];
  for (let c = 0; c < 4; c++) {
    const [x1, y1] = corners[c];
    const [x2, y2] = corners[(c + 1) % 4];
    const steps = 14;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const j = (rnd() - 0.5) * 0.9;
      const nx = -(y2 - y1);
      const ny = x2 - x1;
      const len = Math.hypot(nx, ny);
      pts.push(
        `${(x1 + (x2 - x1) * t + (nx / len) * j).toFixed(2)},${(y1 + (y2 - y1) * t + (ny / len) * j).toFixed(2)}`,
      );
    }
  }
  return `M${pts.join(" L")} Z`;
}

const SHAPE = roughSquare(21);

// Pieczęć „FW” odbita fioletowym tuszem: pełne pole, litery „wycięte”,
// nierówne brzegi i przetarcia jak przy prawdziwej pieczątce.
export function Seal({ id, className = "" }: { id: string; className?: string }) {
  const wear = `seal-wear-${id}`;
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Pieczęć Filip Wrona" className={className}>
      <defs>
        <mask id={wear}>
          <rect width="48" height="48" fill="white" />
          <text
            x="24"
            y="32"
            textAnchor="middle"
            fontSize="20"
            fontWeight="800"
            fill="black"
            style={{ fontFamily: "inherit", fontStretch: "125%", letterSpacing: "-0.6px" }}
          >
            FW
          </text>
          {/* przetarcia tuszu */}
          <circle cx="11" cy="38" r="1.1" fill="black" />
          <circle cx="37.5" cy="9.5" r="0.8" fill="black" />
          <circle cx="40" cy="31" r="0.6" fill="black" />
          <circle cx="19" cy="7.4" r="0.5" fill="black" />
          <circle cx="30" cy="40.6" r="0.7" fill="black" />
          <path d="M6 22 L8.5 21.4" stroke="black" strokeWidth="0.7" />
        </mask>
      </defs>
      <path mask={`url(#${wear})`} fill="currentColor" opacity="0.93" d={SHAPE} />
    </svg>
  );
}
