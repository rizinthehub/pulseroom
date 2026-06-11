import 'dotenv/config';
import { createServer } from './server';
import { env } from './config/env';
import { logger } from './lib/logger';
import {
  ROOM_CLEANUP_SCAN_INTERVAL_MS,
  ROOM_IDLE_DROP_MS,
} from './config/constants';

const { httpServer, io, roomManager } = createServer();

// ─── Room cleanup scan ───
setInterval(() => {
  const now = Date.now();
  for (const room of roomManager.all()) {
    room.stopTickIfIdle();
    if (room.lastReactionAt > 0 && now - room.lastReactionAt > ROOM_IDLE_DROP_MS) {
      const count = io.sockets.adapter.rooms.get(room.code)?.size ?? 0;
      if (count === 0) {
        roomManager.delete(room.code);
        logger.info({ roomCode: room.code }, 'Room dropped from memory (idle)');
      }
    }
  }
}, ROOM_CLEANUP_SCAN_INTERVAL_MS);

// ─── Keep-alive pinger ───
if (env.KEEPALIVE_URL) {
  setInterval(async () => {
    try {
      await fetch(env.KEEPALIVE_URL!);
    } catch {
      logger.warn('Keep-alive ping failed');
    }
  }, env.KEEPALIVE_INTERVAL_MS);
  logger.info({ url: env.KEEPALIVE_URL }, 'Keep-alive pinger started');
}

// ─── Graceful shutdown ───
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received — shutting down gracefully');
  io.emit('system:notice', { kind: 'SERVER_SHUTDOWN', message: 'Server is restarting. Reconnecting shortly.' });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

httpServer.listen(env.PORT, () => {
  logger.info(`PulseRoom server listening on port ${env.PORT}`);
});