import { clamp } from '@/lib/math';
import {
  MOOD_MIN,
  MOOD_MAX,
  DECAY_PER_SEC,
  QUIET_GRACE_MS,
  ZERO_SNAP_THRESHOLD,
  MIN_DELTA_FOR_BROADCAST,
  MAX_QUIET_INTERVAL_MS,
} from '@/config/constants';
import { REACTION_WEIGHTS, type ReactionKey } from '@/types/reaction';

export function applyReaction(score: number, key: ReactionKey): number {
  const weight = REACTION_WEIGHTS[key];
  return clamp(score + weight, MOOD_MIN, MOOD_MAX);
}

export function applyDecay(
  score: number,
  deltaMs: number,
  lastReactionAt: number,
  now: number,
): number {
  if (now - lastReactionAt < QUIET_GRACE_MS) return score;
  const factor = Math.pow(1 - DECAY_PER_SEC, deltaMs / 1000);
  const decayed = score * factor;
  return Math.abs(decayed) < ZERO_SNAP_THRESHOLD ? 0 : decayed;
}

export function shouldBroadcast(
  current: number,
  lastBroadcast: number,
  msSinceLastBroadcast: number,
): boolean {
  if (Math.abs(current - lastBroadcast) >= MIN_DELTA_FOR_BROADCAST) return true;
  if (msSinceLastBroadcast >= MAX_QUIET_INTERVAL_MS && current !== lastBroadcast) return true;
  return false;
}

export function moodLabelFor(score: number): string {
  if (score <= -67) return 'Frozen.';
  if (score <= -33) return 'Cool.';
  if (score <= 20) return 'Calm.';
  if (score <= 50) return 'Warming.';
  if (score <= 80) return 'Hot.';
  return 'Chaotic.';
}

export function trendFor(history: { score: number }[]): string {
  if (history.length < 2) return 'steady';
  const first = history[0];
  const last = history[history.length - 1];
  if (!first || !last) return 'steady';
  const delta = last.score - first.score;
  if (delta > 15) return 'surging';
  if (delta > 5) return 'rising';
  if (delta >= -5) return 'steady';
  if (delta >= -15) return 'cooling';
  return 'crashing';
}