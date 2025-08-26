import Redis from 'ioredis';
import env from '../config/env';

let client: Redis | null = null;

/**
 * Create and return a singleton Redis client.
 */
export const createRedisClient = (): Redis => {
  if (!client) {
    client = new Redis(env.REDIS_URL);
  }
  return client;
};

export default { createRedisClient };
