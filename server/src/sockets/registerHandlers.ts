import type { Socket } from 'socket.io';
import type { Server as IOServer } from 'socket.io';
import type { RoomManager } from '@/rooms/RoomManager';
import { logger } from '@/lib/logger';
import { AppError } from '@/lib/errors';
import { handleJoin } from './handlers/join';
import { handleLeave } from './handlers/leave';
import { handleReaction } from './handlers/reaction';
import { handleDisconnect } from './handlers/disconnect';

function safe(
  handler: (...args: any[]) => Promise<void>,
  socket: Socket,
  io: IOServer,
  ...extra: any[]
) {
  return async (...args: any[]) => {
    try {
      await handler(socket, io, ...extra, ...args);
    } catch (err) {
      if (err instanceof AppError) {
        socket.emit('room:error', { code: err.code, message: err.message });
      } else if (err instanceof Error) {
        logger.error({ err: err.message, socketId: socket.id }, 'Unhandled socket error');
        socket.emit('room:error', { code: 'INTERNAL', message: 'Unexpected error' });
      }
    }
  };
}

export function registerHandlers(
  socket: Socket,
  io: IOServer,
  roomManager: RoomManager,
): void {
  socket.on('room:join', safe(handleJoin, socket, io, roomManager));
  socket.on('room:leave', safe(handleLeave, socket, io));
  socket.on('reaction:send', safe(handleReaction, socket, io, roomManager));
  socket.on('disconnect', () => handleDisconnect(socket, io));

  socket.on('ping:client', (p: { sentAt: number }) => {
    socket.emit('pong:server', { sentAt: p.sentAt, serverAt: Date.now() });
  });
}