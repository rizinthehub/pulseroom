import { RingBuffer } from '@/lib/ringBuffer';
import { startTick, stopTick, isTickRunning } from '@/lib/tickScheduler';
import { applyReaction, applyDecay, shouldBroadcast } from './moodEngine';
import { persistRoomState, appendHistory } from '@/redis/roomStore';
import {
  MOOD_HISTORY_MAX_POINTS,
  REDIS_PERSIST_MIN_DELTA,
  REDIS_PERSIST_MAX_INTERVAL_MS,
} from '@/config/constants';
import type { ReactionKey } from '@/types/reaction';
import type { MoodPoint } from '@/types/room';

export class Room {
  readonly code: string;
  score = 0;
  lastReactionAt = 0;
  lastBroadcastScore = 0;
  lastBroadcastAt = 0;
  lastPersistedScore = 0;
  lastPersistedAt = 0;
  history: RingBuffer<MoodPoint>;
  reactionTotals: Record<ReactionKey, number> = {
    confused: 0, hot: 0, love: 0, laugh: 0, dead: 0,
  };

  private lastTickTime = Date.now();

  constructor(code: string) {
    this.code = code;
    this.history = new RingBuffer<MoodPoint>(MOOD_HISTORY_MAX_POINTS);
  }

    applyReaction(key: ReactionKey): void {
    this.score = applyReaction(this.score, key);
    this.lastReactionAt = Date.now();
    this.reactionTotals[key]++;
    this.history.push({ score: Math.round(this.score), at: this.lastReactionAt });
    this.ensureTickRunning();
  }

  applyDecayTick(): void {
    const now = Date.now();
    const delta = now - this.lastTickTime;
    this.lastTickTime = now;
    this.score = applyDecay(this.score, delta, this.lastReactionAt, now);
  }

  shouldBroadcast(): boolean {
    return shouldBroadcast(
      this.score,
      this.lastBroadcastScore,
      Date.now() - this.lastBroadcastAt,
    );
  }

  shouldPersist(): boolean {
    const now = Date.now();
    const deltaSincePersist = Math.abs(this.score - this.lastPersistedScore);
    const intervalSincePersist = now - this.lastPersistedAt;
    return (
      deltaSincePersist >= REDIS_PERSIST_MIN_DELTA ||
      intervalSincePersist >= REDIS_PERSIST_MAX_INTERVAL_MS
    );
  }

  markBroadcast(): void {
    this.lastBroadcastScore = this.score;
    this.lastBroadcastAt = Date.now();
  }

  async persist(): Promise<void> {
    const now = Date.now();
    await persistRoomState(this.code, this.score, now);
    await appendHistory(this.code, this.score, now);
    this.lastPersistedScore = this.score;
    this.lastPersistedAt = now;
  }

  ensureTickRunning(): void {
    if (!isTickRunning(this.code)) {
      this.lastTickTime = Date.now();
      startTick(this.code, () => this.onTick());
    }
  }

  stopTickIfIdle(): void {
    if (Date.now() - this.lastReactionAt > 30_000 && Math.abs(this.score) < 0.5) {
      stopTick(this.code);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onTick(_callback?: () => void): void {
    this.applyDecayTick();
    // The actual broadcast is handled by a separate broadcaster
    // that checks shouldBroadcast() and calls markBroadcast()
  }

  shutdown(): void {
    stopTick(this.code);
  }
}