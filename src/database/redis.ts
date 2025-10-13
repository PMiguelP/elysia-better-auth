import { RedisClient } from 'bun';
import { env } from '@/env';

const redisUrl = env.REDIS_URL;
export const redis = new RedisClient(redisUrl);
