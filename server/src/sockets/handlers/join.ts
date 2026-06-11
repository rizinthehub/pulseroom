import type { Socket } from 'socket.io';
import type { Server as IOServer } from 'socket.io';
import type { RoomManager } from '@/rooms/RoomManager';
import { RoomJoinPayloadSchema } from '@/api/validators/zod-schemas';
import { readRoomState, readHistoryWindow } from '@/redis/roomStore';
import { SOFT_CAP_PER_ROOM } from '@/config/constants';
import { AppError } from '@/lib/errors';
import { emitHydrate } from '../broadcasters/hydrateBroadcaster';
import { broadcastParticipantCount } from '../broadcasters/participantBroadcaster';

export async function handleJoin(
  socket: Socket,
  io: IOServer,
  roomManager: RoomManager,
  payload: unknown,
): Promise<void> {
  const { roomCode } = RoomJoinPayloadSchema.parse(payload);

  const state = await readRoomState(roomCode);
  if (!state) throw new AppError('ROOM_NOT_FOUND', 404);

  const currentCount = io.sockets.adapter.rooms.get(roomCode)?.size ?? 0;
  if (currentCount >= SOFT_CAP_PER_ROOM) throw new AppError('ROOM_FULL', 403);

  await socket.join(roomCode);
  socket.data.roomCode = roomCode;
  socket.data.joinedAt = Date.now();

  const room = roomManager.getOrCreate(roomCode);
  if (room.score === 0 && state.score !== 0) {
    room.score = state.score;
    room.lastPersistedScore = state.score;
    const history = await readHistoryWindow(roomCode, Date.now());
    room.history.replace(history);
  }

  emitHydrate(socket, roomCode, room, currentCount + 1, state.updatedAt);
  broadcastParticipantCount(io, roomCode);
  room.ensureTickRunning();
}