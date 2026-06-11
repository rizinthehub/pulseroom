import { TICK_INTERVAL_MS } from '@/config/constants';

const handles = new Map<string, NodeJS.Timeout>();

export function startTick(code: string, onTick: () => void): void {
  if (handles.has(code)) return;
  const h = setInterval(onTick, TICK_INTERVAL_MS);
  handles.set(code, h);
}

export function stopTick(code: string): void {
  const h = handles.get(code);
  if (h) {
    clearInterval(h);
    handles.delete(code);
  }
}

export function isTickRunning(code: string): boolean {
  return handles.has(code);
}