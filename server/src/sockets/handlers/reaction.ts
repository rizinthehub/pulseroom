import type { Socket } from 'socket.io';
import type { Server as IOServer } from 'socket.io';
import type { RoomManager } from '@/rooms/RoomManager';
import { ReactionSendPayloadSchema } from '@/api/validators/zod-schemas';
import { getOrCreateBucket } from '../middleware/rateLimit';
import { broadcastMood } from '../broadcasters/moodBroadcaster';

export async function handleReaction(
  socket: Socket,
  io: IOServer,
  roomManager: RoomManager,
  payload: unknown,
): Promise<void> {
  const { reactionKey } = ReactionSendPayloadSchema.parse(payload);

  const code = socket.data.roomCode as string | undefined;
  if (!code) {
    socket.emit('reaction:rejected', { reason: 'ROOM_NOT_JOINED' });
    return;
  }

  const bucket = getOrCreateBucket(socket.id);
  if (!bucket.consume()) {
    socket.emit('reaction:rejected', { reason: 'RATE_LIMIT' });
    return;
  }

  const room = roomManager.get(code);
  if (!room) {
    socket.emit('reaction:rejected', { reason: 'ROOM_NOT_JOINED' });
    return;
  }

  room.applyReaction(reactionKey);

  if (room.shouldBroadcast()) {
    broadcastMood(io, room);
  }

  if (room.shouldPersist()) {
    await room.persist();
  }
}