import { Request, Response, NextFunction } from 'express';
import { createRedisClient } from '../../services/redis.service';
import { REDIS_KEYS } from '../../config/constants';

const redis = createRedisClient();

/**
 * Middleware enforcing idempotency for POST requests.
 * Requires 'Idempotency-Key' header.
 */
export const idempotencyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'POST') return next();

  const key = req.header('Idempotency-Key');
  if (!key) return res.status(400).json({ error: 'Missing Idempotency-Key header' });

  const redisKey = `${REDIS_KEYS.IDEMPOTENCY_PREFIX}${key}`;
  const exists = await redis.get(redisKey);
  if (exists) {
    return res.status(409).json({ error: 'Duplicate request' });
  }

  await redis.set(redisKey, '1', 'EX', 60 * 10);
  next();
};
