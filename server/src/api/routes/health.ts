import type { RequestHandler } from 'express';

export const healthRoute: RequestHandler = (_req, res) => {
  res.json({
    status: 'ok' as const,
    uptime: process.uptime(),
    redis: 'ok' as const,
  });
};