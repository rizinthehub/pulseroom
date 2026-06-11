import type { Socket } from 'socket.io';
import type { Server as IOServer } from 'socket.io';
import { dropBucket } from '../middleware/rateLimit';
import { broadcastParticipantCount } from '../broadcasters/participantBroadcaster';

export function handleDisconnect(socket: Socket, io: IOServer): void {
  const code = socket.data.roomCode as string | undefined;
  dropBucket(socket.id);
  if (code) {
    broadcastParticipantCount(io, code);
  }
}