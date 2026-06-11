import {
  REACTION_RATE_BUCKET_CAPACITY,
  REACTION_RATE_REFILL_PER_SEC,
} from '@/config/constants';

export class TokenBucket {
  private tokens: number;
  private lastRefillAt: number;

  constructor(
    private capacity: number = REACTION_RATE_BUCKET_CAPACITY,
    private refillPerSec: number = REACTION_RATE_REFILL_PER_SEC,
  ) {
    this.tokens = capacity;
    this.lastRefillAt = Date.now();
  }

  consume(): boolean {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSec = (now - this.lastRefillAt) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSec * this.refillPerSec);
    this.lastRefillAt = now;
  }
}

const buckets = new Map<string, TokenBucket>();

export function getOrCreateBucket(socketId: string): TokenBucket {
  let b = buckets.get(socketId);
  if (!b) {
    b = new TokenBucket();
    buckets.set(socketId, b);
  }
  return b;
}

export function dropBucket(socketId: string): void {
  buckets.delete(socketId);
}