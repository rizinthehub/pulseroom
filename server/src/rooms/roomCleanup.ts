import type { RoomManager } from './RoomManager';
import {
  ROOM_IDLE_DROP_MS,
} from '@/config/constants';

export function cleanupIdleRooms(roomManager: RoomManager): void {
  const now = Date.now();
  for (const room of roomManager.all()) {
    room.stopTickIfIdle();
    if (
      room.lastReactionAt > 0 &&
      now - room.lastReactionAt > ROOM_IDLE_DROP_MS
    ) {
      roomManager.delete(room.code);
    }
  }
}