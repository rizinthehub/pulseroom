import type { Socket } from 'socket.io';
import type { Server as IOServer } from 'socket.io';
import { broadcastParticipantCount } from '../broadcasters/participantBroadcaster';

export async function handleLeave(socket: Socket, io: IOServer): Promise<void> {
  const code = socket.data.roomCode as string | undefined;
  if (!code) return;
  await socket.leave(code);
  socket.data.roomCode = undefined;
  broadcastParticipantCount(io, code);
}