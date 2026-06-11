import type { Socket } from 'socket.io';
import type { Room } from '@/rooms/Room';
import type { RoomHydratePayload } from '@/types/socket-events';

export function emitHydrate(
  socket: Socket,
  roomCode: string,
  room: Room,
  participants: number,
  updatedAt: number,
): void {
  const payload: RoomHydratePayload = {
    roomCode,
    mood: { score: Math.round(room.score), at: updatedAt },
    participants,
    history: room.history.toArray(),
  };
  socket.emit('room:hydrate', payload);
}