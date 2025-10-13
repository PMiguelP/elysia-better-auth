import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'), //this is for validate the variavels from the .env
  REDIS_URL: z.url().startsWith('redis://'),
});

export const env = envSchema.parse(Bun.env); // it can also be process.env
