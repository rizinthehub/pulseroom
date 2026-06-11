import { nanoid } from 'nanoid';
import type { Server as IOServer } from 'socket.io';
import type { Room } from '@/rooms/Room';
import { moodLabelFor, trendFor } from '@/rooms/moodEngine';
import { SNAPSHOT_ID_LENGTH } from '@/config/constants';
import type { SnapshotData } from '@/types/snapshot';

export async function buildSnapshotData(
  room: Room,
  io: IOServer,
): Promise<SnapshotData> {
  const now = Date.now();
  const score = Math.round(room.score);
  const history = room.history.toArray();
  const participants = io.sockets.adapter.rooms.get(room.code)?.size ?? 0;

  return {
    snapshotId: nanoid(SNAPSHOT_ID_LENGTH),
    roomCode: room.code,
    capturedAt: now,
    score,
    participants,
    history,
    reactionTotals: { ...room.reactionTotals },
    moodLabel: moodLabelFor(score),
    trend: trendFor(history),
    schemaVersion: 1,
  };
}