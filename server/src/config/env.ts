import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  ALLOWED_ORIGINS: z.string().min(1).transform((s) => s.split(',').map((o) => o.trim())),
  KEEPALIVE_URL: z.string().url().optional(),
  KEEPALIVE_INTERVAL_MS: z.coerce.number().int().positive().default(600000),
});

export const env = EnvSchema.parse(process.env);