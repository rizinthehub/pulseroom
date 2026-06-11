import type { Server as IOServer } from 'socket.io';
import type { Room } from '@/rooms/Room';
import type { MoodUpdatePayload } from '@/types/socket-events';

export function broadcastMood(io: IOServer, room: Room): void {
  const payload: MoodUpdatePayload = {
    score: Math.round(room.score),
    at: Date.now(),
  };
  io.to(room.code).emit('mood:update', payload);
  room.markBroadcast();
}