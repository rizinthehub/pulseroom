import type { Server as IOServer } from 'socket.io';
import type { RoomParticipantCountPayload } from '@/types/socket-events';

export function broadcastParticipantCount(io: IOServer, roomCode: string): void {
  const count = io.sockets.adapter.rooms.get(roomCode)?.size ?? 0;
  const payload: RoomParticipantCountPayload = { participants: count };
  io.to(roomCode).emit('room:participant_count', payload);
}