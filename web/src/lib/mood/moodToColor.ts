const STOPS: { score: number; hex: string }[] = [
  { score: -100, hex: '#1E3A8A' },
  { score: -50, hex: '#0E7490' },
  { score: 0, hex: '#1E293B' },
  { score: 25, hex: '#7C2D6B' },
  { score: 60, hex: '#B91C5C' },
  { score: 100, hex: '#7F1D1D' },
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function moodToColor(score: number): string {
  const clamped = Math.max(-100, Math.min(100, score));

  let lower = STOPS[0];
  let upper = STOPS[STOPS.length - 1];

  for (let i = 0; i < STOPS.length - 1; i++) {
    if (clamped >= STOPS[i].score && clamped <= STOPS[i + 1].score) {
      lower = STOPS[i];
      upper = STOPS[i + 1];
      break;
    }
  }

  const range = upper.score - lower.score;
  const t = range === 0 ? 0 : (clamped - lower.score) / range;

  const [r1, g1, b1] = hexToRgb(lower.hex);
  const [r2, g2, b2] = hexToRgb(upper.hex);

  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t));
}