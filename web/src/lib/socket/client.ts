import { io, type Socket } from 'socket.io-client';
import { env } from '../env';
import { setConnectionStatus } from './connectionState';

let socket: Socket | null = null;
let reconnectAttempts = 0;

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

    socket.on('connect', () => {
      setConnectionStatus('connected');
      reconnectAttempts = 0;
    });

    socket.on('disconnect', () => {
      setConnectionStatus('reconnecting');
    });

    socket.on('connect_error', () => {
      reconnectAttempts++;
      if (reconnectAttempts >= 10) {
        setConnectionStatus('disconnected');
      }
    });
  }
  return socket;
}

export function destroySocket(): void {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    reconnectAttempts = 0;
    setConnectionStatus('idle');
  }
}