import '@/tracing'
import { env } from '@/env'
import { app } from './app'

const server = app.listen({
  port: env.PORT,
  hostname: '0.0.0.0',
})

console.log(
  `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`,
)
