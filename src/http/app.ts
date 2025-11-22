import { cors } from '@elysiajs/cors';
import Elysia from 'elysia';
import { env } from '@/env';
import { tracing } from '@/tracing';
import { betterAuthPlugin } from './plugins/better-auth';
//import { errorHandlerPlugin } from './plugins/error-handler';
import { openapiPlugin } from './plugins/openai';
import { getUsers } from './routes/get-users';

export const app = new Elysia()
  .use(tracing)
  .use(openapiPlugin)
  .use(
    cors({
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      origin:
        env.NODE_ENV === 'development'
          ? 'http://localhost:3333'
          : /.*\.nave\.so$/,
    }),
  )
  .use(betterAuthPlugin)
  .use(getUsers);
//.use(errorHandlerPlugin);
// .use() // Aqui você pode adicionar as rotas futuras
