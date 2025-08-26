import { Queue } from 'bullmq';
import { createRedisClient } from './redis.service';
import { QUEUES } from '../config/constants';

export const queues: Record<string, Queue> = {};

/**
 * Initialize BullMQ queues.
 */
export const initQueues = () => {
  const connection = createRedisClient();
  Object.values(QUEUES).forEach((name) => {
    queues[name] = new Queue(name, { connection });
  });
};

export default { initQueues, queues };
