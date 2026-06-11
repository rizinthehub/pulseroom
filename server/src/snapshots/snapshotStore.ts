import { redis } from '@/redis/client';
import { snapshotKey } from '@/redis/keys';
import type { SnapshotData } from '@/types/snapshot';

export async function persistSnapshot(data: SnapshotData): Promise<void> {
  await redis.set(snapshotKey(data.snapshotId), JSON.stringify(data), {
    ex: 604800,
  });
}

export async function readSnapshot(
  id: string,
): Promise<SnapshotData | null> {
  const raw = await redis.get<string>(snapshotKey(id));
  if (!raw) return null;
  return JSON.parse(raw) as SnapshotData;
}