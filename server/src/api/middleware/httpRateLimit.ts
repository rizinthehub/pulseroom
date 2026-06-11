import type { Request, Response, NextFunction } from 'express';
import { TokenBucket } from '@/sockets/middleware/rateLimit';
import { HTTP_RATE_LIMIT_PER_MIN } from '@/config/constants';

const ipBuckets = new Map<string, TokenBucket>();

export function httpRateLimit(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip ?? 'unknown';
  let bucket = ipBuckets.get(ip);
  if (!bucket) {
    bucket = new TokenBucket(HTTP_RATE_LIMIT_PER_MIN, HTTP_RATE_LIMIT_PER_MIN / 60);
    ipBuckets.set(ip, bucket);
  }

  if (!bucket.consume()) {
    res.status(429).json({
      error: { code: 'RATE_LIMIT', message: 'Too many requests. Try again shortly.' },
    });
    return;
  }

  next();
}