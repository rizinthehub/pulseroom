import { io, type Socket } from 'socket.io-client';
import { env } from '../env';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(env.VITE_SERVER_URL, {
      transports: ['websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
      timeout: 10000,
    });
  }
  return socket;
}

export function destroySocket(): void {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}