import { z } from 'zod';

const Schema = z.object({
  VITE_SERVER_URL: z.string().url(),
  VITE_PUBLIC_APP_URL: z.string().url().optional(),
});

export const env = Schema.parse(import.meta.env);
