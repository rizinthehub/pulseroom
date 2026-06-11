import { redis } from './client';
import { roomStateKey, roomHistoryKey } from './keys';

export async function createRoom(code: string, now: number): Promise<void> {
  const key = roomStateKey(code);
  await redis
    .pipeline()
    .hset(key, { code, score: 0, createdAt: now, updatedAt: now })
    .expire(key, 7200)
    .exec();
}

export async function persistRoomState(
  code: string,
  score: number,
  updatedAt: number,
): Promise<void> {
  const key = roomStateKey(code);
  await redis
    .pipeline()
    .hset(key, { score: Math.round(score), updatedAt })
    .expire(key, 7200)
    .exec();
}

export async function readRoomState(
  code: string,
): Promise<{ score: number; updatedAt: number } | null> {
  const data = await redis.hgetall<Record<string, string>>(roomStateKey(code));
  if (!data || Object.keys(data).length === 0) return null;
  return {
    score: Number(data.score ?? 0),
    updatedAt: Number(data.updatedAt ?? Date.now()),
  };
}

export async function appendHistory(
  code: string,
  score: number,
  at: number,
): Promise<void> {
  const key = roomHistoryKey(code);
  const member = `${at}:${Math.round(score)}`;
  await redis
    .pipeline()
    .zadd(key, { score: at, member })
    .zremrangebyscore(key, '-inf', at - 60_000)
    .expire(key, 7200)
    .exec();
}

export async function readHistoryWindow(
  code: string,
  now: number,
): Promise<{ at: number; score: number }[]> {
  const min = now - 60_000;
  const members = await redis.zrange<string[]>(roomHistoryKey(code), min, now, {
    byScore: true,
  });
  return members.map((m) => {
    const [at, score] = m.split(':');
    return { at: Number(at), score: Number(score) };
  });
}