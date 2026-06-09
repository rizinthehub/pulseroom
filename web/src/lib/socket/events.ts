import type { Socket } from 'socket.io-client';

// Client → Server events
export function emitPing(socket: Socket, sentAt: number) {
  socket.emit('ping:client', { sentAt });
}

// Server → Client events
export function onPong(
  socket: Socket,
  cb: (data: { sentAt: number; serverAt: number }) => void,
) {
  socket.on('pong:server', cb);
}

export function offPong(socket: Socket) {
  socket.off('pong:server');
}