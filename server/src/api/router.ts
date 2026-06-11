import { Router } from 'express';
import type { Server as IOServer } from 'socket.io';
import type { RoomManager } from '@/rooms/RoomManager';
import { createRoomRoute } from './routes/rooms.create';
import { validateRoomRoute } from './routes/rooms.validate';
import { createSnapshotRoute } from './routes/snapshots.create';
import { getSnapshotRoute } from './routes/snapshots.get';
import { healthRoute } from './routes/health';
import { httpRateLimit } from './middleware/httpRateLimit';
import { jsonError } from './middleware/jsonError';

export function createRouter(io: IOServer, roomManager: RoomManager): Router {
  const router = Router();

  router.use(httpRateLimit);

  router.get('/healthz', healthRoute);
  router.post('/api/rooms', createRoomRoute);
  router.get('/api/rooms/:code', validateRoomRoute);
  router.post('/api/snapshots', createSnapshotRoute(io, roomManager));
  router.get('/api/snapshots/:id', getSnapshotRoute);

  router.use(jsonError);

  return router;
}