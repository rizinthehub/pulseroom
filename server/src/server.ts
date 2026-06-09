import express from 'express';
import http from 'node:http';
import { Server as IOServer } from 'socket.io';
import cors from 'cors';
import { env } from './config/env';

export function createServer() {
  const app = express();
  app.use(cors({ origin: env.ALLOWED_ORIGINS }));

  app.get('/healthz', (_req, res) => {
    res.json({ status: 'ok' });
  });

  const httpServer = http.createServer(app);
  const io = new IOServer(httpServer, {
    cors: { origin: env.ALLOWED_ORIGINS, methods: ['GET', 'POST'] },
    transports: ['websocket'],
  });

  io.on('connection', (socket) => {
    console.log('connected', socket.id);
    socket.on('ping:client', (p: { sentAt: number }) => {
      socket.emit('pong:server', { sentAt: p.sentAt, serverAt: Date.now() });
    });
  });

  return { app, httpServer, io };
}
