import { useMemo } from 'react';
import type { MoodPoint } from '../../types/room';
import { MOOD_HISTORY_WINDOW_MS } from '../../lib/constants';

interface MoodGraphProps {
  history: MoodPoint[];
  nowMs: number;
}

function buildPath(history: MoodPoint[], width: number, height: number, nowMs: number): string {
  if (!history.length) return '';
  const windowMs = MOOD_HISTORY_WINDOW_MS;
  const startTime = nowMs - windowMs;
  const points = history.map((p) => {
    const x = ((p.at - startTime) / windowMs) * width;
    const y = (height / 2) - (p.score / 100) * (height / 2 - 8);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return points.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt}`).join(' ');
}

export function MoodGraph({ history, nowMs }: MoodGraphProps) {
  const width = 280;
  const height = 80;

  const path = useMemo(() => buildPath(history, width, height, nowMs), [history, nowMs]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-text-tertiary w-3 text-right">+</span>
      <svg width={width} height={height} className="overflow-visible">
        {/* Center line */}
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
        {/* Mood line */}
        {path && (
          <path
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <span className="text-[10px] text-text-tertiary w-3">−</span>
    </div>
  );
}