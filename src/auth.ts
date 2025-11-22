import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { emailHarmony } from 'better-auth-harmony';
import { db } from '@/database/client';
import { redis } from '@/database/redis';

export const auth = betterAuth({
  basePath: '/auth',
  plugins: [
    openAPI(),
    emailHarmony({
      allowNormalizedSignin: true,
    }),
  ],
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true, //this creates every thing database relates in plural
    camelCase: false, //is already the default is only to know
  }),
  advanced: {
    database: {
      generateId: false,
      cookiePrefix: 'nave', //ver o que isto faz
    },
  },
  emailAndPassword: {
    enabled: true,
    //requireEmailVerification: true,
    autoSignIn: true,
    password: {
      hash: (input: string) => Bun.password.hash(input),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  secondaryStorage: {
    get: async (key: string) => {
      return await redis.get(key);
    },
    set: async (key: string, value: string, ttl?: number) => {
      await redis.set(key, value);

      if (ttl) {
        await redis.expire(key, ttl);
      }
    },
    delete: async (key: string) => {
      await redis.del(key);
    },
  },
});
// por padrao o better auth usa session stateful ou aunteticacao via sessao
