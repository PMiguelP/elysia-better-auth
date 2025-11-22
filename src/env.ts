import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'), //this is for validate the variavels from the .env
  REDIS_URL: z.url().startsWith('redis://'),
  OTEL_TRACE_EXPORTER_URL: z.url('http://'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3333'),
})

export const env = envSchema.parse(Bun.env) // it can also be process.env
export const PORT = Number(env.PORT)
export const NODE_ENV = env.NODE_ENV
