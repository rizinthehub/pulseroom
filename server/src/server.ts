import express from 'express';
import http from 'node:http';
import { Server as IOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { RoomManager } from './rooms/RoomManager';
import { registerHandlers } from './sockets/registerHandlers';
import { createRouter } from './api/router';

export function createServer() {
  const app = express();

  // Security
  app.use(helmet({ crossOriginEmbedderPolicy: false }));
  app.use(cors({ origin: env.ALLOWED_ORIGINS, methods: ['GET', 'POST'] }));
  app.use(express.json());

  // Room manager (in-memory state)
  const roomManager = new RoomManager();

  // HTTP + Socket.io
  const httpServer = http.createServer(app);
  const io = new IOServer(httpServer, {
    cors: { origin: env.ALLOWED_ORIGINS, methods: ['GET', 'POST'] },
    transports: ['websocket'],
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  // API routes
  const router = createRouter(io, roomManager);
  app.use(router);

  // Socket.io handlers
  io.on('connection', (socket) => {
    registerHandlers(socket, io, roomManager);
  });

  return { app, httpServer, io, roomManager };
}